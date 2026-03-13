import * as d3 from 'd3';
// Copyright 2021-2024 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/force-directed-graph
export function ForceGraph(
	{ nodes, links },
	{
		nodeId = (d) => d.id,
		nodeGroup,
		nodeGroups,
		nodeTitle,
		nodeFill = 'currentColor',
		nodeStroke = '#fff',
		nodeStrokeWidth = 1.5,
		nodeStrokeOpacity = 1,
		nodeRadius = 5,
		nodeStrength,

		// per-node color option (if provided, overrides nodeGroup color)
		nodeColor, // (d) => "#RRGGBB" or "rgba(...)"

		// per-node shape options
		// "circle" | "square" | "triangle" | "diamond" | "cross" | "star" | "wye" | "person"
		nodeSymbol = () => 'circle',
		// symbol "size" (area in px^2). If omitted, derived from nodeRadius.
		nodeSymbolSize,

		// label options
		nodeLabel = (d) => d.id,
		labelFill = '#0f172a',
		labelFontSize = 11,
		labelOffset = 8,

		linkSource = ({ source }) => source,
		linkTarget = ({ target }) => target,
		linkStroke = '#999',
		linkStrokeOpacity = 0.6,
		linkStrokeWidth = 1.5,
		linkStrokeLinecap = 'round',
		linkStrength,

		// spacing options
		linkDistance = 70,
		collidePadding = 15,
		collideStrength = 1,
		collideIterations = 2,

		// bounding / confinement options
		constrain = true, // keep nodes inside the visible width/height box
		constrainPadding = 2, // extra padding from edges
		constrainDamping = 0.6, // damp velocity when hitting walls (reduces jitter)
		constrainKeepLabelsInBounds = true, // ONLY affects edge clamping (NOT collision)

		colors = d3.schemeTableau10,
		width = 640,
		height = 400,
		invalidation,
	} = {},
) {
	// Compute values.
	const N = d3.map(nodes, nodeId).map(intern);
	const R = typeof nodeRadius !== 'function' ? null : d3.map(nodes, nodeRadius);
	const LS = d3.map(links, linkSource).map(intern);
	const LT = d3.map(links, linkTarget).map(intern);

	if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
	const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);

	const G = nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern);
	const W = typeof linkStrokeWidth !== 'function' ? null : d3.map(links, linkStrokeWidth);
	const L = typeof linkStroke !== 'function' ? null : d3.map(links, linkStroke);

	// compute labels, per-node colors, and per-node symbols BEFORE nodes are replaced
	const Lab = nodeLabel == null ? null : d3.map(nodes, nodeLabel);
	const C = nodeColor == null ? null : d3.map(nodes, nodeColor);
	const Sym = nodeSymbol == null ? null : d3.map(nodes, nodeSymbol);
	const SymSize = nodeSymbolSize == null ? null : d3.map(nodes, nodeSymbolSize);

	const keepLabelsInBounds = Boolean(constrainKeepLabelsInBounds && Lab);

	// Replace the input nodes and links with mutable objects for the simulation.
	nodes = d3.map(nodes, (_, i) => ({ id: N[i] }));
	links = d3.map(links, (_, i) => ({ source: LS[i], target: LT[i] }));

	// Compute default domains.
	if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);

	// Construct the scales.
	const color = nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);

	// --- Symbol helpers ---
	const SYMBOLS = {
		circle: d3.symbolCircle,
		square: d3.symbolSquare,
		triangle: d3.symbolTriangle,
		diamond: d3.symbolDiamond,
		cross: d3.symbolCross,
		star: d3.symbolStar,
		wye: d3.symbolWye,
	};

	// Head + shoulders silhouette (simple) in a 24x24 box.
	// We'll translate(-12,-12) after scaling to center it at (x,y).
	const PERSON_PATH =
		'M12 12.2c2.54 0 4.6-2.06 4.6-4.6S14.54 3 12 3 7.4 5.06 7.4 7.6s2.06 4.6 4.6 4.6z' +
		'M4.8 21c0-3.3 3.5-5.8 7.2-5.8s7.2 2.5 7.2 5.8v0.8H4.8V21z';

	const symGen = d3.symbol();

	function isPerson(i) {
		const v = Sym ? Sym[i] : 'circle';
		return typeof v === 'string' && v.toLowerCase() === 'person';
	}

	function getSymbolType(i) {
		const v = Sym ? Sym[i] : 'circle';

		// allow passing a d3 symbol type object directly (rare, but supported)
		if (v && typeof v === 'object' && typeof v.draw === 'function') return v;

		if (typeof v === 'string') return SYMBOLS[v] || d3.symbolCircle;
		return d3.symbolCircle;
	}

	function getRadiusFromInputs(i) {
		if (R) {
			const r = Number(R[i]);
			if (Number.isFinite(r) && r > 0) return r;
		}
		if (typeof nodeRadius === 'number' && Number.isFinite(nodeRadius) && nodeRadius > 0) return nodeRadius;
		return 5;
	}

	function getSymbolSize(i) {
		if (SymSize) {
			const s = Number(SymSize[i]);
			if (Number.isFinite(s) && s > 0) return s;
		}
		const r = getRadiusFromInputs(i);
		return Math.PI * r * r;
	}

	function getSymbolRadiusApprox(i) {
		const s = getSymbolSize(i);
		return Math.sqrt(s / Math.PI);
	}

	// PERSON_PATH is 24x24 (area 576). Scale so its area roughly matches getSymbolSize(i).
	function personScale(i) {
		const s = getSymbolSize(i);
		const baseArea = 24 * 24;
		return Math.sqrt(s / baseArea);
	}

	function visualRadius(i) {
		return isPerson(i) ? 12 * personScale(i) : getSymbolRadiusApprox(i);
	}

	function nodePathD(i) {
		return isPerson(i) ? PERSON_PATH : symGen.type(getSymbolType(i)).size(getSymbolSize(i))();
	}

	// ✅ Label bounds estimation (ONLY used for edge confinement)
	// We do NOT use this for collision between nodes.
	const LABEL_CHAR_WIDTH = 0.6;

	function labelText(i) {
		if (!Lab) return '';
		const t = Lab[i];
		return t == null ? '' : String(t);
	}

	function labelHalfWidth(i) {
		const t = labelText(i);
		if (!t) return 0;
		return (t.length * labelFontSize * LABEL_CHAR_WIDTH) / 2;
	}

	function labelBottomExtent(i) {
		// label baseline is placed at y + visualRadius + labelOffset
		// add font height buffer so it stays inside bottom edge
		return visualRadius(i) + labelOffset + labelFontSize + 4;
	}

	function effectiveHalfWidthForBounds(i) {
		// keep label inside left/right edges when enabled
		return keepLabelsInBounds ? Math.max(visualRadius(i), labelHalfWidth(i)) : visualRadius(i);
	}

	// ✅ bounding helpers (viewBox is centered at 0,0)
	const halfW = width / 2;
	const halfH = height / 2;

	function clamp(v, min, max) {
		return v < min ? min : v > max ? max : v;
	}

	function clampNodePosition(d) {
		const i = d.index ?? 0;

		// left/right must consider label width if enabled
		const halfX = effectiveHalfWidthForBounds(i) + constrainPadding;

		// top bound only needs node radius
		const topR = visualRadius(i) + constrainPadding;

		// bottom bound considers label height if enabled
		const bottomR = (keepLabelsInBounds ? labelBottomExtent(i) : visualRadius(i)) + constrainPadding;

		const minX = -halfW + halfX;
		const maxX = halfW - halfX;
		const minY = -halfH + topR;
		const maxY = halfH - bottomR;

		if (maxX <= minX || maxY <= minY) {
			d.x = 0;
			d.y = 0;
			d.vx *= 0.2;
			d.vy *= 0.2;
			return;
		}

		const px = d.x;
		const py = d.y;

		d.x = clamp(d.x, minX, maxX);
		d.y = clamp(d.y, minY, maxY);

		if (d.x !== px) d.vx *= constrainDamping;
		if (d.y !== py) d.vy *= constrainDamping;
	}

	function clampPointForIndex(i, x, y) {
		const halfX = effectiveHalfWidthForBounds(i) + constrainPadding;
		const topR = visualRadius(i) + constrainPadding;
		const bottomR = (keepLabelsInBounds ? labelBottomExtent(i) : visualRadius(i)) + constrainPadding;

		const minX = -halfW + halfX;
		const maxX = halfW - halfX;
		const minY = -halfH + topR;
		const maxY = halfH - bottomR;

		if (maxX <= minX || maxY <= minY) return { x: 0, y: 0 };

		return { x: clamp(x, minX, maxX), y: clamp(y, minY, maxY) };
	}

	// Construct the forces.
	const forceNode = d3.forceManyBody();
	const forceLink = d3.forceLink(links).id(({ index: i }) => N[i]);

	if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
	if (linkStrength !== undefined) forceLink.strength(linkStrength);

	if (linkDistance !== undefined) forceLink.distance(linkDistance);

	// ✅ Collision is ONLY node radius-based (label NOT included)
	const forceCollide = d3
		.forceCollide()
		.radius(({ index: i }) => visualRadius(i) + collidePadding)
		.strength(collideStrength)
		.iterations(collideIterations);

	const simulation = d3
		.forceSimulation(nodes)
		.force('link', forceLink)
		.force('charge', forceNode)
		.force('collide', forceCollide)
		.force('center', d3.forceCenter())
		.on('tick', ticked);

	const svg = d3
		.create('svg')
		.attr('width', width)
		.attr('height', height)
		.attr('viewBox', [-halfW, -halfH, width, height])
		.attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

	const link = svg
		.append('g')
		.attr('stroke', typeof linkStroke !== 'function' ? linkStroke : null)
		.attr('stroke-opacity', linkStrokeOpacity)
		.attr('stroke-width', typeof linkStrokeWidth !== 'function' ? linkStrokeWidth : null)
		.attr('stroke-linecap', linkStrokeLinecap)
		.selectAll('line')
		.data(links)
		.join('line');

	// Nodes as paths, so each node can have a different shape (including "person")
	const node = svg
		.append('g')
		.attr('fill', nodeFill)
		.attr('stroke', nodeStroke)
		.attr('stroke-opacity', nodeStrokeOpacity)
		.attr('stroke-width', nodeStrokeWidth)
		.selectAll('path')
		.data(nodes)
		.join('path')
		.attr('d', ({ index: i }) => nodePathD(i))
		.call(drag(simulation));

	if (W) link.attr('stroke-width', ({ index: i }) => W[i]);
	if (L) link.attr('stroke', ({ index: i }) => L[i]);

	// fill priority: nodeColor (C) > nodeGroup color (G) > nodeFill
	if (C) node.attr('fill', ({ index: i }) => C[i] || nodeFill);
	else if (G) node.attr('fill', ({ index: i }) => color(G[i]));

	if (T) node.append('title').text(({ index: i }) => T[i]);

	// labels under nodes
	const labels =
		Lab == null
			? null
			: svg
					.append('g')
					.attr('pointer-events', 'none')
					.attr('text-anchor', 'middle')
					.attr('fill', labelFill)
					.attr('font-size', labelFontSize)
					.attr('font-family', 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif')
					.selectAll('text')
					.data(nodes)
					.join('text')
					.text(({ index: i }) => Lab[i])
					.attr('dy', '0.35em');

	if (invalidation != null) invalidation.then(() => simulation.stop());

	function intern(value) {
		return value !== null && typeof value === 'object' ? value.valueOf() : value;
	}

	function ticked() {
		// clamp nodes first so everything (links/labels) draws in-bounds
		if (constrain) {
			for (const d of nodes) clampNodePosition(d);
		}

		link
			.attr('x1', (d) => d.source.x)
			.attr('y1', (d) => d.source.y)
			.attr('x2', (d) => d.target.x)
			.attr('y2', (d) => d.target.y);

		node.attr('transform', ({ x, y, index: i }) => {
			if (isPerson(i)) {
				const k = personScale(i);
				return `translate(${x},${y}) scale(${k}) translate(-12,-12)`;
			}
			return `translate(${x},${y})`;
		});

		if (labels) {
			labels.attr('x', (d) => d.x).attr('y', ({ index: i, y }) => y + visualRadius(i) + labelOffset);
		}
	}

	function drag(simulation) {
		function dragstarted(event) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			event.subject.fx = event.subject.x;
			event.subject.fy = event.subject.y;
		}

		function dragged(event) {
			const i = event.subject.index ?? 0;

			let x = event.x;
			let y = event.y;

			if (constrain) {
				const p = clampPointForIndex(i, x, y);
				x = p.x;
				y = p.y;
			}

			event.subject.fx = x;
			event.subject.fy = y;
		}

		function dragended(event) {
			if (!event.active) simulation.alphaTarget(0);
			event.subject.fx = null;
			event.subject.fy = null;
		}

		return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
	}

	return Object.assign(svg.node(), { scales: { color }, simulation });
}
