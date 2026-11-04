import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const COUNTRY_COLORS = [
	{ light: '#dbeafe', hover: '#93c5fd', selected: '#3b82f6' }, // blue
	{ light: '#dcfce7', hover: '#86efac', selected: '#22c55e' }, // green
	{ light: '#fef3c7', hover: '#fcd34d', selected: '#f59e0b' }, // amber
	{ light: '#fce7f3', hover: '#f9a8d4', selected: '#ec4899' }, // pink
	{ light: '#ede9fe', hover: '#c4b5fd', selected: '#8b5cf6' }, // purple
	{ light: '#cffafe', hover: '#67e8f9', selected: '#06b6d4' }, // cyan
	{ light: '#ffedd5', hover: '#fdba74', selected: '#f97316' }, // orange
	{ light: '#ccfbf1', hover: '#5eead4', selected: '#14b8a6' }, // teal
	{ light: '#f3e8ff', hover: '#d8b4fe', selected: '#a855f7' }, // violet
	{ light: '#fee2e2', hover: '#fca5a5', selected: '#ef4444' }, // red
	{ light: '#ecfccb', hover: '#bef264', selected: '#84cc16' }, // lime
	{ light: '#e0e7ff', hover: '#a5b4fc', selected: '#6366f1' }, // indigo
	{ light: '#fef9c3', hover: '#fde047', selected: '#eab308' }, // yellow
	{ light: '#ffe4e6', hover: '#fda4af', selected: '#f43f5e' }, // rose
	{ light: '#e2f7ee', hover: '#8dd3b5', selected: '#2f9e73' }, // mint
];

// Keep consistent with Collaboration.jsx
function normalizeCountryKey(name) {
	const raw = String(name || '').trim();
	if (!raw) return '';

	const lower = raw.toLowerCase().trim();

	if (['usa', 'u.s.a', 'u.s.a.', 'united states', 'united states of america'].includes(lower))
		return 'united states of america';
	if (['uk', 'u.k', 'u.k.', 'united kingdom', 'great britain'].includes(lower)) return 'united kingdom';

	return lower
		.replace(/&/g, 'and')
		.replace(/[^a-z0-9 ]/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

export default function PublicationsCountryMap({
	countryGroups = [],
	selectedCountryKey,
	onSelectCountryKey,
	height = 620,
	showControls = true,
}) {
	const mapWrapRef = useRef(null);

	const [mapSize, setMapSize] = useState({
		width: 1000,
		height: typeof height === 'number' ? height : 620,
	});

	const [zoom, setZoom] = useState(1);
	const [center, setCenter] = useState([0, 15]);

	const countryColorMap = useMemo(() => {
		const map = new Map();

		countryGroups.forEach((group, index) => {
			map.set(group.key, COUNTRY_COLORS[index % COUNTRY_COLORS.length]);
		});

		return map;
	}, [countryGroups]);

	// Build quick lookup: geoName -> group
	const groupsByKey = useMemo(() => {
		const m = new Map();
		countryGroups.forEach((g) => m.set(g.key, g));
		return m;
	}, [countryGroups]);

	// Totals (for display)
	const totals = useMemo(() => {
		const countries = countryGroups.length;

		// this is per-country count (publication repeats across countries by design)
		const countryPublicationInstances = countryGroups.reduce((acc, g) => acc + (g.publications?.length || 0), 0);

		// unique publications across all countries (by pubId)
		const unique = new Set();
		countryGroups.forEach((g) => {
			(g.publications || []).forEach((p) => {
				if (p?.pubId) unique.add(p.pubId);
			});
		});

		return {
			countries,
			countryPublicationInstances,
			uniquePublications: unique.size,
		};
	}, [countryGroups]);

	// resize-aware width
	useEffect(() => {
		if (!mapWrapRef.current) return;
		const el = mapWrapRef.current;

		const updateSize = () => {
			const width = Math.max(320, el.clientWidth || 1000);
			const nextHeight = typeof height === 'number' ? height : 620;
			setMapSize({ width, height: nextHeight });
		};

		updateSize();

		let ro;
		if (typeof ResizeObserver !== 'undefined') {
			ro = new ResizeObserver(updateSize);
			ro.observe(el);
		} else {
			window.addEventListener('resize', updateSize);
		}

		return () => {
			if (ro) ro.disconnect();
			else window.removeEventListener('resize', updateSize);
		};
	}, [height]);

	// projection scale based on container width
	const mapScale = useMemo(() => {
		return Math.max(120, Math.min(235, mapSize.width * 0.15));
	}, [mapSize.width]);

	const resetView = () => {
		setCenter([0, 15]);
		setZoom(1);
	};

	// Determine if a geography has publications (and the matching key)
	function resolveKeyForGeo(geoName) {
		const k = normalizeCountryKey(geoName);
		if (groupsByKey.has(k)) return k;
		return null;
	}

	return (
		<div
			ref={mapWrapRef}
			style={{
				width: '100%',
				maxWidth: '100%',
				minWidth: 0,
			}}
		>
			{/* Stats row ABOVE the map (not a hover tooltip) */}
			<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1, alignItems: 'center' }}>
				<Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap' }}>
					<Chip label={`${totals.countries} countries`} size="small" />
					<Chip label={`${totals.uniquePublications} unique publications`} size="small" variant="outlined" />
					<Chip
						label={`${totals.countryPublicationInstances} country-publication entries`}
						size="small"
						variant="outlined"
					/>
				</Stack>
			</Box>

			<div
				className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
				style={{
					position: 'relative',
					height: mapSize.height,
					minWidth: 0,
					maxWidth: '100%',
					overflow: 'hidden',
					touchAction: 'none',
					border: '2px solid rgba(59,130,246,0.35)',
					borderRadius: 16,
				}}
				onWheelCapture={(e) => {
					// prevents accidental page scroll/zoom weirdness over the map
					e.preventDefault();
					e.stopPropagation();
				}}
			>
				{showControls && (
					<Box sx={{ position: 'absolute', left: 12, top: 12, zIndex: 10 }}>
						<ButtonGroup variant="outlined" size="small" aria-label="map controls">
							<Button onClick={() => setZoom((z) => Math.min(6, +(z * 1.25).toFixed(2)))}>+</Button>
							<Button onClick={() => setZoom((z) => Math.max(1, +(z / 1.25).toFixed(2)))}>−</Button>
							<Button onClick={resetView}>Reset</Button>
						</ButtonGroup>
					</Box>
				)}

				<ComposableMap
					projection="geoMercator"
					projectionConfig={{ scale: mapScale }}
					width={mapSize.width}
					height={mapSize.height}
					style={{ width: '100%', height: '100%', display: 'block' }}
				>
					<ZoomableGroup
						center={center}
						zoom={zoom}
						onMoveEnd={({ coordinates, zoom: nextZoom }) => {
							setCenter(coordinates);
							setZoom(nextZoom);
						}}
					>
						<Geographies geography={GEO_URL}>
							{({ geographies }) =>
								geographies.map((geo) => {
									const name = geo?.properties?.name || geo?.properties?.NAME || '';
									const key = resolveKeyForGeo(name);
									const hasData = Boolean(key);

									const group = key ? groupsByKey.get(key) : null;
									const count = group?.publications?.length ?? group?.count ?? 0;
									const unique_authors = group?.unique_authors?.size ?? 0;

									const isSelected = key && selectedCountryKey === key;

									const countryColor = key ? countryColorMap.get(key) : null;

									const defaultFill = hasData ? countryColor.light : '#e2e8f0';

									const hoverFill = hasData ? countryColor.hover : '#e2e8f0';

									const selectedFill = hasData ? countryColor.selected : '#e2e8f0';

									const tooltipText = hasData
										? `${name || 'Unknown'} — ${count} publication${count === 1 ? '' : 's'} (${unique_authors} unique author${unique_authors === 1 ? '' : 's'})`
										: `${name || 'Unknown'}`;

									return (
										<Geography
											key={geo.rsmKey}
											geography={geo}
											// Avoid focus/outline weirdness + “jumping”
											tabIndex={-1}
											focusable="false"
											onMouseDown={(e) => e.preventDefault()}
											onClick={() => {
												if (!key) return;
												onSelectCountryKey(key);
											}}
											style={{
												default: {
													fill: isSelected ? selectedFill : defaultFill,
													stroke: '#cbd5e1',
													strokeWidth: 0.6,
													outline: 'none',
													cursor: hasData ? 'pointer' : 'default',
												},
												hover: {
													fill: isSelected ? selectedFill : hoverFill,
													stroke: '#94a3b8',
													strokeWidth: 0.8,
													outline: 'none',
													cursor: hasData ? 'pointer' : 'default',
												},
												pressed: {
													fill: selectedFill,
													outline: 'none',
												},
											}}
										>
											{/* ✅ Native SVG tooltip */}
											<title>{tooltipText}</title>
										</Geography>
									);
								})
							}
						</Geographies>
					</ZoomableGroup>
				</ComposableMap>
			</div>
		</div>
	);
}
