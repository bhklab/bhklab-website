import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { scaleSqrt } from 'd3-scale';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const STATUS_COLORS = {
	Completed: '#10b981',
	Ongoing: '#f59e0b',
	'Not started': '#6366f1',
	Unknown: '#94a3b8',
};

export default function CollaborationsMap({
	cityGroups = [],
	selectedCityKey,
	onSelectCityKey,
	height = 700,
	showControls = true,
}) {
	const mapWrapRef = useRef(null);

	const [mapSize, setMapSize] = useState({
		width: 1000,
		height: typeof height === 'number' ? height : 700,
	});

	const [zoom, setZoom] = useState(1);
	const [center, setCenter] = useState([0, 15]);

	// resize-aware width
	useEffect(() => {
		if (!mapWrapRef.current) return;
		const el = mapWrapRef.current;

		const updateSize = () => {
			const width = Math.max(320, el.clientWidth || 1000);
			const nextHeight = typeof height === 'number' ? height : 700;
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

	const mapScale = useMemo(() => Math.max(120, Math.min(235, mapSize.width * 0.15)), [mapSize.width]);

	const bubbleScale = useMemo(() => {
		const max = Math.max(1, ...cityGroups.map((c) => c.count || 1));
		return scaleSqrt().domain([1, max]).range([10, 30]);
	}, [cityGroups]);

	// focus on selected city
	useEffect(() => {
		if (!selectedCityKey) return;
		const c = cityGroups.find((g) => g.key === selectedCityKey);
		if (!c) return;

		setCenter([c.longitude, c.latitude]);
		setZoom(2.1);
	}, [selectedCityKey, cityGroups]);

	const resetView = () => {
		setCenter([0, 15]);
		setZoom(1);
	};

	// ✅ Summary totals (computed from groups)
	const totals = useMemo(() => {
		const countries = new Set(cityGroups.map((g) => g.country).filter(Boolean));
		const collaborations = cityGroups.reduce((acc, g) => acc + (Number(g.count) || 0), 0);

		return {
			collaborations,
			cities: cityGroups.length,
			countries: countries.size,
		};
	}, [cityGroups]);

	return (
		<div
			ref={mapWrapRef}
			style={{
				width: '100%',
				maxWidth: '100%',
				minWidth: 0,
			}}
		>
			{/* ✅ Summary section ABOVE the map */}
			<Box sx={{ mb: 1.5 }}>
				<Stack direction="row" spacing={1} alignItems="center" useFlexGap flexWrap="wrap">
					<Chip
						label={`${totals.collaborations} collaborations`}
						size="small"
						variant="outlined"
						sx={{
							borderColor: 'rgba(59,130,246,0.35)',
							color: 'rgba(15,23,42,0.9)',
							fontWeight: 700,
							backgroundColor: 'rgba(59,130,246,0.08)',
						}}
					/>
					<Chip
						label={`${totals.cities} cities`}
						size="small"
						variant="outlined"
						sx={{
							borderColor: 'rgba(148,163,184,0.6)',
							backgroundColor: 'rgba(255,255,255,0.9)',
						}}
					/>
					<Chip
						label={`${totals.countries} countries`}
						size="small"
						variant="outlined"
						sx={{
							borderColor: 'rgba(148,163,184,0.6)',
							backgroundColor: 'rgba(255,255,255,0.9)',
						}}
					/>
				</Stack>
			</Box>

			{/* Zoom controls ABOVE the map */}
			{showControls && (
				<Box sx={{ mb: 1 }}>
					<ButtonGroup variant="outlined" aria-label="Small button group" size="small">
						<Button onClick={() => setZoom((z) => Math.min(6, +(z * 1.25).toFixed(2)))}>+</Button>
						<Button onClick={() => setZoom((z) => Math.max(1, +(z / 1.25).toFixed(2)))}>−</Button>
						<Button onClick={resetView}>Reset</Button>
					</ButtonGroup>
				</Box>
			)}

			{/* MAP */}
			<div
				className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
				style={{
					position: 'relative',
					height: mapSize.height,
					minWidth: 0,
					maxWidth: '100%',
					overflow: 'hidden',
					touchAction: 'none',
					border: '2px solid rgba(59,130,246,0.35)',
					borderRadius: '16px',
				}}
				onWheelCapture={(e) => {
					e.preventDefault();
					e.stopPropagation();
				}}
			>
				<ComposableMap
					projection="geoMercator"
					projectionConfig={{ scale: mapScale }}
					width={mapSize.width}
					height={mapSize.height}
					style={{
						width: '100%',
						height: '100%',
						display: 'block',
					}}
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
								geographies.map((geo) => (
									<Geography
										key={geo.rsmKey}
										geography={geo}
										tabIndex={-1}
										focusable="false"
										aria-hidden="true"
										pointerEvents="none"
										style={{
											default: {
												fill: '#e2e8f0',
												stroke: '#cbd5e1',
												strokeWidth: 0.5,
												outline: 'none',
												pointerEvents: 'none',
											},
											hover: {
												fill: '#e2e8f0',
												stroke: '#cbd5e1',
												strokeWidth: 0.5,
												outline: 'none',
												pointerEvents: 'none',
											},
											pressed: {
												fill: '#e2e8f0',
												outline: 'none',
												pointerEvents: 'none',
											},
										}}
									/>
								))
							}
						</Geographies>

						{cityGroups.map((city) => {
							const r = bubbleScale(city.count);
							const color = STATUS_COLORS[city.dominantStatus] || STATUS_COLORS.Unknown;
							const isSelected = selectedCityKey === city.key;

							return (
								<Marker key={city.key} coordinates={[city.longitude, city.latitude]}>
									<g
										role="button"
										tabIndex={0}
										className="cursor-pointer"
										onMouseDown={(e) => e.preventDefault()}
										onClick={() => onSelectCityKey(city.key)}
										onKeyDown={(e) => {
											if (e.key === 'Enter' || e.key === ' ') {
												e.preventDefault();
												onSelectCityKey(city.key);
											}
										}}
									>
										<circle r={r + 14} fill="rgba(15,23,42,0.01)" stroke="none" />
										<circle r={r + 6} fill="rgba(15,23,42,0.08)" />
										<circle
											r={r}
											fill={color}
											fillOpacity={0.92}
											stroke={isSelected ? '#0f172a' : '#ffffff'}
											strokeWidth={isSelected ? 2.5 : 1.5}
										/>
										<text
											y={4}
											textAnchor="middle"
											style={{
												fill: 'white',
												fontSize: Math.max(10, Math.min(14, r * 0.55)),
												fontWeight: 700,
												pointerEvents: 'none',
												userSelect: 'none',
											}}
										>
											{city.count}
										</text>
									</g>
								</Marker>
							);
						})}
					</ZoomableGroup>
				</ComposableMap>
			</div>
		</div>
	);
}
