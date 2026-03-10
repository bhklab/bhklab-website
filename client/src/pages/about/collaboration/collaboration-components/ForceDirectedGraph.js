import React, { useEffect, useRef } from 'react';
import { ForceGraph } from '../lib/ForceGraph'; // adjust export to match what you pasted

export default function ForceDirectedGraph({
	graph, // { nodes: [...], links: [...] }
	width = 900,
	height = 600,
	options = {}, // pass-through ForceGraph options
}) {
	const hostRef = useRef(null);

	useEffect(() => {
		if (!hostRef.current) return;

		// Clear previous render
		hostRef.current.innerHTML = '';

		// Create the SVG/Canvas element
		const el = ForceGraph(graph, {
			width,
			height,
			nodeColor: (d) => d.color,

			nodeStrength: -250, // more negative = more repulsion
			linkDistance: 110, // longer links = more spacing
			collidePadding: 8, // more space between circles
			nodeSymbol: (d) => d.shape, // "circle"|"square"|...
			nodeSymbolSize: (d) => d.size, // area in px^2 (optional)
		});

		// Append to DOM
		hostRef.current.appendChild(el);

		// Cleanup on unmount or rerender
		return () => {
			// If the notebook’s ForceGraph exposes a simulation or cleanup, call it here.
			// Many Observable versions stop the simulation on element removal.
			hostRef.current.innerHTML = '';
		};
	}, [graph, width, height, options]);

	return <div ref={hostRef} style={{ width, height }} />;
}
