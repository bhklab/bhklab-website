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

		// ✅ NEW: per-node shape options
		// nodeSymbol can return one of: "circle" | "square" | "triangle" | "diamond" | "cross" | "star" | "wye"
		nodeSymbol = () => 'circle',
		// nodeSymbolSize is the d3 symbol "size" (area in px^2). If omitted, derived from nodeRadius.
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
		collidePadding = 6,
		collideStrength = 1,
		collideIterations = 2,

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

	const symGen = d3.symbol();

	function getSymbolType(i) {
		const v = Sym ? Sym[i] : 'circle';

		// allow passing a d3 symbol type object directly (rare, but supported)
		if (v && typeof v === 'object' && typeof v.draw === 'function') return v;

		if (typeof v === 'string') return SYMBOLS[v] || d3.symbolCircle;
		return d3.symbolCircle;
	}

	function getRadiusFromInputs(i) {
		// If user supplied a radius function, prefer it.
		if (R) {
			const r = Number(R[i]);
			if (Number.isFinite(r) && r > 0) return r;
		}
		// Otherwise use numeric nodeRadius if provided.
		if (typeof nodeRadius === 'number' && Number.isFinite(nodeRadius) && nodeRadius > 0) return nodeRadius;

		// fallback
		return 5;
	}

	function getSymbolSize(i) {
		// If nodeSymbolSize accessor is provided, use it when valid.
		if (SymSize) {
			const s = Number(SymSize[i]);
			if (Number.isFinite(s) && s > 0) return s;
		}

		// Otherwise derive from radius: size ≈ area of circle with radius r
		const r = getRadiusFromInputs(i);
		return Math.PI * r * r;
	}

	function getSymbolRadiusApprox(i) {
		// Approx radius based on symbol size (area); good for collision + label offset
		const s = getSymbolSize(i);
		return Math.sqrt(s / Math.PI);
	}

	// Construct the forces.
	const forceNode = d3.forceManyBody();
	const forceLink = d3.forceLink(links).id(({ index: i }) => N[i]);

	if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
	if (linkStrength !== undefined) forceLink.strength(linkStrength);

	// spread nodes by increasing link distance
	if (linkDistance !== undefined) forceLink.distance(linkDistance);

	// collision force prevents overlap (uses symbol size/radius approximation)
	const forceCollide = d3
		.forceCollide()
		.radius(({ index: i }) => getSymbolRadiusApprox(i) + collidePadding)
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
		.attr('viewBox', [-width / 2, -height / 2, width, height])
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

	// ✅ Nodes as symbols (paths), so each node can have a different shape
	const node = svg
		.append('g')
		.attr('fill', nodeFill)
		.attr('stroke', nodeStroke)
		.attr('stroke-opacity', nodeStrokeOpacity)
		.attr('stroke-width', nodeStrokeWidth)
		.selectAll('path')
		.data(nodes)
		.join('path')
		.attr('d', ({ index: i }) => symGen.type(getSymbolType(i)).size(getSymbolSize(i))())
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
		link
			.attr('x1', (d) => d.source.x)
			.attr('y1', (d) => d.source.y)
			.attr('x2', (d) => d.target.x)
			.attr('y2', (d) => d.target.y);

		// ✅ paths need transform translate (not cx/cy)
		node.attr('transform', (d) => `translate(${d.x},${d.y})`);

		if (labels) {
			labels.attr('x', (d) => d.x).attr('y', ({ index: i, y }) => y + getSymbolRadiusApprox(i) + labelOffset);
		}
	}

	function drag(simulation) {
		function dragstarted(event) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			event.subject.fx = event.subject.x;
			event.subject.fy = event.subject.y;
		}

		function dragged(event) {
			event.subject.fx = event.x;
			event.subject.fy = event.y;
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
