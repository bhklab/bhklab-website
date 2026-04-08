import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

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

									const isSelected = key && selectedCountryKey === key;

									const fill = isSelected ? '#60a5fa' : hasData ? '#cfe3ff' : '#e2e8f0';

									const tooltipText = hasData
										? `${name || 'Unknown'} — ${count} publication${count === 1 ? '' : 's'}`
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
													fill,
													stroke: '#cbd5e1',
													strokeWidth: 0.6,
													outline: 'none',
													cursor: hasData ? 'pointer' : 'default',
													userSelect: 'none',
												},
												hover: {
													fill: isSelected ? '#60a5fa' : hasData ? '#a5d0ff' : '#e2e8f0',
													stroke: '#94a3b8',
													strokeWidth: 0.8,
													outline: 'none',
													cursor: hasData ? 'pointer' : 'default',
												},
												pressed: {
													fill: isSelected ? '#60a5fa' : hasData ? '#a5d0ff' : '#e2e8f0',
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
