// src/components/LabCollaborationsMap2DEmbed.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { scaleSqrt } from 'd3-scale';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const STATUS_COLORS = {
	Completed: '#10b981',
	Ongoing: '#f59e0b',
	'Not started': '#6366f1',
	Unknown: '#94a3b8',
};

const FALLBACK_COORDS = {
	'Toronto|Canada': { latitude: 43.651, longitude: -79.347 },
};

const SAFE_WRAP_STYLE = {
	overflowWrap: 'anywhere',
	wordBreak: 'break-word',
	whiteSpace: 'normal',
	maxWidth: '100%',
	minWidth: 0,
};

const NUCLEAR_WRAP_STYLE = {
	overflowWrap: 'anywhere',
	wordBreak: 'break-all',
	whiteSpace: 'normal',
	maxWidth: '100%',
	minWidth: 0,
};

const CLAMP_CONTAINER_STYLE = {
	minWidth: 0,
	maxWidth: '100%',
	width: '100%',
};

function clean(v) {
	if (v === null || v === undefined) return '';
	return String(v).trim();
}

function maybe(v) {
	const s = clean(v);
	if (!s || s.toUpperCase() === 'NA') return null;
	return s;
}

function normalizeStatus(raw) {
	const s = clean(raw).toLowerCase();
	if (s.includes('completed')) return 'Completed';
	if (s.includes('ongoing')) return 'Ongoing';
	if (s.includes('not started')) return 'Not started';
	return 'Unknown';
}

function normalizeType(raw) {
	return clean(raw).replace(/\s+/g, ' ').trim() || 'Unknown';
}

function normalizeRecord(row, index) {
	const city = clean(row.city || row.City || 'Unknown');
	const country = clean(row.country || 'Unknown');
	const fallback = FALLBACK_COORDS[`${city}|${country}`];

	const lat = Number.isFinite(Number(row.latitude)) ? Number(row.latitude) : (fallback?.latitude ?? null);

	const lon = Number.isFinite(Number(row.longitude)) ? Number(row.longitude) : (fallback?.longitude ?? null);

	return {
		id: row?._id?.$oid || row?._id || `row-${index}`,
		mainCollab: clean(row.maincollab ?? row['main-collab']),
		otherCollabs: maybe(row.othercollabs ?? row['other-collabs']),
		organization: clean(row.organization),
		country,
		city,
		startYear: Number(row.startyear ?? row['start-year']) || null,
		type: normalizeType(row.type),
		project: clean(row.project),
		contact: maybe(row.contact),
		members: maybe(row.members),
		role: maybe(row.role),
		status: normalizeStatus(row.status),
		outputs: maybe(row.outputs),
		latitude: lat,
		longitude: lon,
		hasCoordinates: Number.isFinite(lat) && Number.isFinite(lon),
	};
}

function groupByCity(records) {
	const map = new Map();

	records.forEach((r) => {
		if (!r.hasCoordinates) return;

		const key = `${r.city}|${r.country}|${r.latitude}|${r.longitude}`;
		if (!map.has(key)) {
			map.set(key, {
				key,
				city: r.city,
				country: r.country,
				latitude: r.latitude,
				longitude: r.longitude,
				collaborations: [],
			});
		}
		map.get(key).collaborations.push(r);
	});

	return Array.from(map.values()).map((group) => {
		const statusCounts = group.collaborations.reduce((acc, c) => {
			acc[c.status] = (acc[c.status] || 0) + 1;
			return acc;
		}, {});

		const dominantStatus = Object.entries(statusCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';

		const years = group.collaborations.map((c) => c.startYear).filter((y) => Number.isFinite(y));

		return {
			...group,
			count: group.collaborations.length,
			statusCounts,
			dominantStatus,
			types: [...new Set(group.collaborations.map((c) => c.type))].sort(),
			minYear: years.length ? Math.min(...years) : null,
			maxYear: years.length ? Math.max(...years) : null,
		};
	});
}

function Badge({ children }) {
	return (
		<span
			className="inline-flex max-w-full items-center rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-700"
			style={SAFE_WRAP_STYLE}
		>
			{children}
		</span>
	);
}

export default function LabCollaborationsMap2DEmbed({
	className = '',
	height = 520,
	detailsHeight = 360,
	showControls = true,
}) {
	const mapWrapRef = useRef(null);
	const detailsScrollRef = useRef(null);

	const [data, setData] = useState(null);

	const [mapSize, setMapSize] = useState({
		width: 1000,
		height: typeof height === 'number' ? height : 520,
	});

	const [zoom, setZoom] = useState(1);
	const [center, setCenter] = useState([0, 15]);

	const [selectedCityKey, setSelectedCityKey] = useState(null);

	const [isLoading, setIsLoading] = useState(true);
	const [loadError, setLoadError] = useState(null);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const fetchCollaborations = async () => {
			try {
				setIsLoading(true);
				setLoadError(null);

				const response = await axios.get('/api/data/collaborations', {
					signal: controller.signal,
				});

				const payload = response?.data;
				const rows = Array.isArray(payload)
					? payload
					: Array.isArray(payload?.collaborations)
						? payload.collaborations
						: Array.isArray(payload?.data)
							? payload.data
							: [];

				if (isMounted) setData(rows);
			} catch (err) {
				if (err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') return;

				console.error('Failed to fetch collaborations:', err);
				if (isMounted) {
					setLoadError(err?.message || 'Failed to load collaborations');
					setData([]);
				}
			} finally {
				if (isMounted) setIsLoading(false);
			}
		};

		fetchCollaborations();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	const records = useMemo(() => (Array.isArray(data) ? data : []).map((row, i) => normalizeRecord(row, i)), [data]);

	const cityGroups = useMemo(() => {
		return groupByCity(records).sort((a, b) => b.count - a.count || a.city.localeCompare(b.city));
	}, [records]);

	const selectedCity = useMemo(() => {
		if (!cityGroups.length) return null;
		return cityGroups.find((c) => c.key === selectedCityKey) || null;
	}, [cityGroups, selectedCityKey]);

	const bubbleScale = useMemo(() => {
		const max = Math.max(1, ...cityGroups.map((c) => c.count));
		return scaleSqrt().domain([1, max]).range([10, 30]);
	}, [cityGroups]);

	const totals = useMemo(() => {
		const countries = new Set(records.map((r) => r.country));
		const cities = new Set(records.filter((r) => r.hasCoordinates).map((r) => `${r.city}|${r.country}`));
		const unplaced = records.filter((r) => !r.hasCoordinates).length;

		return {
			collaborations: records.length,
			cities: cities.size,
			countries: countries.size,
			unplaced,
		};
	}, [records]);

	// Reset scroll to top when city changes (prevents "middle of list" issue)
	useEffect(() => {
		if (detailsScrollRef.current) {
			detailsScrollRef.current.scrollTop = 0;
		}
	}, [selectedCityKey]);

	useEffect(() => {
		if (!mapWrapRef.current) return;
		const el = mapWrapRef.current;

		const updateSize = () => {
			const width = Math.max(320, el.clientWidth || 1000);
			const nextHeight = typeof height === 'number' ? height : Math.max(360, Math.min(760, Math.round(width * 0.58)));

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

	const resolvedMapHeight = Math.max(360, typeof height === 'number' ? height : mapSize.height);

	const resolvedDetailsHeight = typeof detailsHeight === 'number' ? Math.max(260, detailsHeight) : 360;

	const mapScale = useMemo(() => {
		return Math.max(120, Math.min(235, mapSize.width * 0.15));
	}, [mapSize.width]);

	const focusCity = (city, zoomLevel = 2.1) => {
		if (!city) return;
		setCenter([city.longitude, city.latitude]);
		setZoom(zoomLevel);
	};

	const resetView = () => {
		setCenter([0, 15]);
		setZoom(1);
	};

	if (isLoading) {
		return (
			<div className={`w-full ${className}`}>
				<div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
					Loading collaborations...
				</div>
			</div>
		);
	}

	return (
		<div
			className={`w-full max-w-full overflow-x-hidden ${className}`}
			style={{ minWidth: 0, maxWidth: '100%', overflowX: 'clip' }}
		>
			{/* Two independent fixed-height rows: map + data panel */}
			<div
				style={{
					...CLAMP_CONTAINER_STYLE,
					display: 'grid',
					gridTemplateRows: `${resolvedMapHeight}px minmax(0, ${resolvedDetailsHeight}px)`,
					rowGap: 16,
					minWidth: 0,
					minHeight: 0,
					maxWidth: '100%',
					width: '100%',
					overflow: 'hidden',
				}}
			>
				{/* MAP ROW */}
				<div className="min-w-0 max-w-full" style={CLAMP_CONTAINER_STYLE}>
					<div
						className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 max-w-full"
						ref={mapWrapRef}
						onWheelCapture={(e) => {
							e.preventDefault();
							e.stopPropagation();
						}}
						style={{
							...CLAMP_CONTAINER_STYLE,
							height: resolvedMapHeight,
							minHeight: 0,
							maxHeight: resolvedMapHeight,
							overflow: 'hidden',
							touchAction: 'none',
							WebkitUserSelect: 'none',
							userSelect: 'none',
							WebkitTapHighlightColor: 'transparent',
							overscrollBehavior: 'contain',
						}}
					>
						{showControls && (
							<div className="absolute right-3 top-3 z-10 flex gap-2">
								<button
									onClick={() => setZoom((z) => Math.min(6, +(z * 1.25).toFixed(2)))}
									className="rounded-lg border border-slate-300 bg-white/95 px-3 py-1.5 text-sm shadow-sm hover:bg-white"
									type="button"
								>
									+
								</button>
								<button
									onClick={() => setZoom((z) => Math.max(1, +(z / 1.25).toFixed(2)))}
									className="rounded-lg border border-slate-300 bg-white/95 px-3 py-1.5 text-sm shadow-sm hover:bg-white"
									type="button"
								>
									−
								</button>
								<button
									onClick={resetView}
									className="rounded-lg border border-slate-300 bg-white/95 px-3 py-1.5 text-sm shadow-sm hover:bg-white"
									type="button"
								>
									Reset
								</button>
							</div>
						)}

						<div className="pointer-events-none absolute left-3 top-3 z-10 flex max-w-[80%] flex-wrap gap-2">
							<span className="rounded-full border border-white/70 bg-white/90 px-2.5 py-1 text-xs text-slate-700 shadow-sm">
								{totals.collaborations}
								collaborations
							</span>
							<span className="rounded-full border border-white/70 bg-white/90 px-2.5 py-1 text-xs text-slate-700 shadow-sm">
								{totals.cities}
								cities
							</span>
							<span className="rounded-full border border-white/70 bg-white/90 px-2.5 py-1 text-xs text-slate-700 shadow-sm">
								{totals.countries}
								countries
							</span>
							{totals.unplaced > 0 && (
								<span className="rounded-full border border-white/70 bg-white/90 px-2.5 py-1 text-xs text-slate-700 shadow-sm">
									{totals.unplaced}
									missing coordinates
								</span>
							)}
						</div>

						<ComposableMap
							projection="geoMercator"
							projectionConfig={{ scale: mapScale }}
							width={mapSize.width}
							height={resolvedMapHeight}
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
														cursor: 'default',
														userSelect: 'none',
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
									const isSelected = selectedCity?.key === city.key;

									return (
										<Marker key={city.key} coordinates={[city.longitude, city.latitude]}>
											<g
												role="button"
												tabIndex={0}
												className="cursor-pointer"
												onMouseDown={(e) => e.preventDefault()}
												onClick={() => {
													setSelectedCityKey(city.key);
													focusCity(city);
												}}
												onKeyDown={(e) => {
													if (e.key === 'Enter' || e.key === ' ') {
														e.preventDefault();
														setSelectedCityKey(city.key);
														focusCity(city);
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

				{/* DETAILS ROW */}
				<div
					className="min-w-0 max-w-full"
					style={{
						...CLAMP_CONTAINER_STYLE,
						minHeight: 0,
						maxHeight: resolvedDetailsHeight,
						overflow: 'hidden',
					}}
				>
					<div
						className="overflow-hidden rounded-2xl border border-slate-200 bg-white max-w-full"
						style={{
							height: '100%',
							minHeight: 0,
							maxHeight: '100%',
							minWidth: 0,
							maxWidth: '100%',
							width: '100%',
							overflow: 'hidden',
							display: 'grid',
							gridTemplateRows: 'auto minmax(0, 1fr)',
						}}
					>
						<div className="min-w-0 border-b border-slate-200 p-4" style={CLAMP_CONTAINER_STYLE}>
							<h3
								className="text-base font-semibold text-slate-900"
								style={{ ...SAFE_WRAP_STYLE, ...CLAMP_CONTAINER_STYLE }}
							>
								{selectedCity ? `${selectedCity.city}, ${selectedCity.country}` : 'Select a city'}
							</h3>

							<p className="mt-1 text-sm text-slate-600" style={{ ...SAFE_WRAP_STYLE, ...CLAMP_CONTAINER_STYLE }}>
								{selectedCity
									? `${selectedCity.count} collaboration${
											selectedCity.count > 1 ? 's' : ''
										} • ${selectedCity.minYear}–${selectedCity.maxYear}`
									: 'Click a map marker to view collaboration details below.'}
							</p>
						</div>

						{/* ONLY SCROLLABLE AREA */}
						<div
							ref={detailsScrollRef}
							className="min-h-0 overflow-y-auto"
							style={{
								minHeight: 0,
								height: '100%',
								overflowY: 'auto',
								overflowX: 'hidden',
								minWidth: 0,
								maxWidth: '100%',
								width: '100%',
								overscrollBehaviorY: 'contain',
								overscrollBehaviorX: 'none',
								WebkitOverflowScrolling: 'touch',
								scrollbarGutter: 'stable both-edges',
								padding: 16,
								paddingBottom: 20,
								scrollPaddingTop: 16,
								scrollPaddingBottom: 20,
							}}
						>
							<div style={{ minWidth: 0, maxWidth: '100%' }}>
								{loadError && (
									<div className="mb-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
										Failed to load collaborations: {loadError}
									</div>
								)}

								{!selectedCity ? (
									<div className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-600">
										This panel is fixed-height and scrollable. Click a city marker on the map to populate it with
										collaboration details.
									</div>
								) : (
									<>
										<div className="mb-3 flex min-w-0 flex-wrap gap-2 text-xs" style={CLAMP_CONTAINER_STYLE}>
											<Badge>
												{selectedCity.count}
												collaborations
											</Badge>
											{Object.entries(selectedCity.statusCounts).map(([status, count]) => (
												<Badge key={status}>
													{status}:{count}
												</Badge>
											))}
										</div>

										<div className="space-y-3" style={CLAMP_CONTAINER_STYLE}>
											{selectedCity.collaborations
												.slice()
												.sort((a, b) => (b.startYear || 0) - (a.startYear || 0))
												.map((c) => (
													<div
														key={c.id}
														className="overflow-hidden rounded-2xl border border-slate-200 p-3"
														style={CLAMP_CONTAINER_STYLE}
													>
														<div
															className="grid items-start gap-2"
															style={{
																gridTemplateColumns: 'minmax(0,1fr) auto',
																minWidth: 0,
																maxWidth: '100%',
																width: '100%',
															}}
														>
															<Card
																sx={{
																	minWidth: 275,
																	border: 'black',
																	borderWidth: 1,
																	borderStyle: 'solid',
																	backgroundColor: '#ffffffff',
																}}
															>
																<CardContent>
																	<Typography gutterBottom sx={{ color: 'text.PRIMARY', fontSize: 14 }}>
																		<span
																			className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white"
																			style={{
																				background: STATUS_COLORS[c.status] || STATUS_COLORS.Unknown,
																				maxWidth: '100%',
																				whiteSpace: 'nowrap',
																			}}
																		>
																			{c.status}
																		</span>
																	</Typography>
																	<Typography variant="h5" component="div">
																		{c.project}
																	</Typography>
																	<Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{c.role}</Typography>
																	<Typography variant="body2">
																		well meaning and kindly.
																		<br />
																		{'"a benevolent smile"'}
																	</Typography>
																</CardContent>
																<CardActions>
																	<Button size="small">Learn More</Button>
																</CardActions>
															</Card>
														</div>
														<br></br>
													</div>
												))}
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
