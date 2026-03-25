import React, { useEffect, useRef } from 'react';
import ForceGraph from '../lib/ForceGraph';

export default function ForceDirectedGraph({
	graph, // { nodes: [...], links: [...] }
	width = 900,
	height = 600,
	options = {}, // pass-through ForceGraph options
}) {
	const hostRef = useRef(null);

	useEffect(() => {
		const host = hostRef.current; // ✅ capture once
		if (!host) return;
		if (!graph || !Array.isArray(graph.nodes) || !Array.isArray(graph.links)) return;

		// Clear previous render
		host.innerHTML = '';

		// Create the SVG element
		const el = ForceGraph(graph, {
			width,
			height,

			// defaults (caller can override via options below)
			nodeColor: (d) => d.color,
			nodeStrength: -250,
			linkDistance: 110,
			collidePadding: 8,
			nodeSymbol: (d) => d.shape,
			nodeSymbolSize: (d) => d.size,

			...options,
		});

		// Append to DOM
		host.appendChild(el);

		// Cleanup on rerender/unmount
		return () => {
			// ✅ stop simulation if present (prevents leaks / background ticks)
			if (el && el.simulation && typeof el.simulation.stop === 'function') {
				el.simulation.stop();
			}

			// ✅ host is the captured element; safe even if ref becomes null
			if (host) host.innerHTML = '';
		};
	}, [graph, width, height, options]);

	return (
		<div
			ref={hostRef}
			style={{
				width: '100%', // ✅ responsive width
				height, // ✅ fixed px height from computed dims
				maxWidth: '100%',
				overflow: 'hidden',
			}}
		/>
	);
}
