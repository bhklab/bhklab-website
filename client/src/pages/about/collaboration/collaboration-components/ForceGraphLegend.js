import React from 'react';
import * as d3 from 'd3';

// Same “person” head+shoulders path you used in ForceGraph (24x24 viewBox)
const PERSON_PATH =
	'M12 12.2c2.54 0 4.6-2.06 4.6-4.6S14.54 3 12 3 7.4 5.06 7.4 7.6s2.06 4.6 4.6 4.6z' +
	'M4.8 21c0-3.3 3.5-5.8 7.2-5.8s7.2 2.5 7.2 5.8v0.8H4.8V21z';

const SYMBOL_TYPES = {
	circle: d3.symbolCircle,
	square: d3.symbolSquare,
	triangle: d3.symbolTriangle,
	diamond: d3.symbolDiamond,
	cross: d3.symbolCross,
	star: d3.symbolStar,
	wye: d3.symbolWye,
};

function LegendSymbol({ shape, color = '#334155', size = 18 }) {
	// Custom “person”
	if (shape === 'person') {
		return (
			<svg style={{ width: size, height: size, display: 'block' }} viewBox="0 0 24 24" aria-hidden="true">
				<path d={PERSON_PATH} fill={color} />
			</svg>
		);
	}

	// ✅ D3 symbol path (includes real wye)
	const type = SYMBOL_TYPES[shape] || d3.symbolCircle;

	// D3 “size” is area in px^2. This scales nicely for small legend icons.
	// Tweak the multiplier if you want bigger/smaller legend glyphs.
	const area = size * size * 0.6;

	const d = d3.symbol().type(type).size(area)();

	return (
		<svg style={{ width: size, height: size, display: 'block' }} viewBox="-12 -12 24 24" aria-hidden="true">
			<path d={d} fill={color} />
		</svg>
	);
}

export default function ForceGraphLegend({ items }) {
	// items: [{ shape, label, color }]
	return (
		<div
			style={{
				width: '100%',
				display: 'flex',
				flexWrap: 'wrap',
				gap: 12,
				alignItems: 'center',
				padding: '20px 0px',
				background: 'rgba(255,255,255,0.7)',
				backdropFilter: 'blur(6px)',
			}}
		>
			{items.map((it) => (
				<div
					key={`${it.shape}-${it.label}`}
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: 8,
						padding: '6px 10px',
						borderRadius: 999,
						border: '1px solid rgba(148,163,184,0.35)',
						background: 'white',
					}}
				>
					<LegendSymbol shape={it.shape} color={it.color} size={18} />
					<span style={{ fontSize: 12, color: '#0f172a', fontWeight: 600 }}>{it.label}</span>
				</div>
			))}
		</div>
	);
}
