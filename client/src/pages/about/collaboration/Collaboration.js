// src/components/.../Collaboration.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';

import StyledHeading from '../../../styles/StyledHeading';
import StyledCollabs from './CollaborationStyles';

import ForceDirectedGraph from './collaboration-components/ForceDirectedGraph';
import ForceGraphLegend from './collaboration-components/ForceGraphLegend';

// ✅ publications map + details
import PublicationsCountryMap from './collaboration-components/PublicationsCountryMap';
import CountryPublicationsDetails from './collaboration-components/CountryPublicationsDetails';

const legendItems = [
	{ shape: 'person', label: 'Benjamin Haibe-Kains', color: '#079ee9ff' },
	{ shape: 'diamond', label: 'Main collaborator', color: '#0021f7ff' },
	{ shape: 'wye', label: 'Other collaborator', color: '#ed08d2ff' },
	{ shape: 'cross', label: 'Lab Member / Contact', color: '#15d9bb' },
];

function helperCreateNodesAndLinks(adjacency, displays) {
	const nodeObjArray = [];
	displays.forEach((value, key) => {
		if (adjacency.has(key)) nodeObjArray.push({ id: key, color: value.color, shape: value.symbol, size: value.size });
	});

	const links = [];
	const seen = new Map();
	adjacency.forEach((nei, node) => {
		nei.forEach((weight, neighbor) => {
			if ((seen.has(node) && seen.get(node).has(neighbor)) || (seen.has(neighbor) && seen.get(neighbor).has(node))) {
				return;
			}
			links.push({ source: node, target: neighbor, count: weight });
			if (!seen.has(node)) seen.set(node, new Set());
			if (!seen.has(neighbor)) seen.set(neighbor, new Set());
			seen.get(node).add(neighbor);
			seen.get(neighbor).add(node);
		});
	});

	return { nodes: nodeObjArray, links };
}

function createAdjacencyList(records) {
	const adjacency = new Map();
	adjacency.set('BHK', new Map());

	const adjacencyReduced = new Map();
	adjacencyReduced.set('BHK', new Map());

	const displays = new Map();
	displays.set('BHK', { color: '#079ee9ff', symbol: 'person', size: 1000 });

	records.forEach((r) => {
		const main = r.maincollab;
		const others = r.othercollabs !== 'NA' ? r.othercollabs.split(',').map((s) => s.trim()) : [];
		const members = r.members !== 'NA' ? r.members.split(',').map((s) => s.trim()) : [];
		const contact = r.contact !== 'NA' ? r.contact.split(',').map((s) => s.trim()) : [];

		const mergedcontacts = new Set([...(members || []), ...(contact || [])]);
		mergedcontacts.delete('BHK');
		const membersandcontacts = [...mergedcontacts];

		// Reduced graph: only connect BHK to main collaborators
		if (!adjacencyReduced.get('BHK').has(main)) adjacencyReduced.get('BHK').set(main, 0);
		adjacencyReduced.get('BHK').set(main, adjacencyReduced.get('BHK').get(main) + 1);
		if (!adjacencyReduced.has(main)) adjacencyReduced.set(main, new Map([['BHK', 0]]));
		adjacencyReduced.get(main).set('BHK', adjacencyReduced.get(main).get('BHK') + 1);

		membersandcontacts.forEach((member) => {
			if (!adjacency.has(member)) adjacency.set(member, new Map());

			adjacency.get('BHK').set(member, (adjacency.get('BHK').get(member) || 0) + 1);
			adjacency.get(member).set('BHK', (adjacency.get(member).get('BHK') || 0) + 1);

			adjacency.get(member).set(main, (adjacency.get(member).get(main) || 0) + 1);
			displays.set(member, { color: '#15d9bb', symbol: 'cross', size: 100 });

			if (!adjacency.has(main)) adjacency.set(main, new Map());
			adjacency.get(main).set(member, (adjacency.get(main).get(member) || 0) + 1);
			displays.set(main, { color: '#0021f7ff', symbol: 'diamond', size: 160 });
		});

		others.forEach((other) => {
			if (!other) return;

			adjacency.get(main).set(other, (adjacency.get(main).get(other) || 0) + 1);
			if (!adjacency.has(other)) adjacency.set(other, new Map());
			adjacency.get(other).set(main, (adjacency.get(other).get(main) || 0) + 1);

			// Reduced graph: only connect main collaborators to other collaborators
			if (!adjacencyReduced.get(main).has(other)) adjacencyReduced.get(main).set(other, 0);
			adjacencyReduced.get(main).set(other, adjacencyReduced.get(main).get(other) + 1);
			if (!adjacencyReduced.has(other)) adjacencyReduced.set(other, new Map());
			if (!adjacencyReduced.get(other).has(main)) adjacencyReduced.get(other).set(main, 0);
			adjacencyReduced.get(other).set(main, adjacencyReduced.get(other).get(main) + 1);

			if (!displays.has(other)) displays.set(other, { color: '#ed08d2ff', symbol: 'wye', size: 120 });
		});
	});

	const nodesLinksMain = helperCreateNodesAndLinks(adjacency, displays);
	const nodesLinksReduced = helperCreateNodesAndLinks(adjacencyReduced, displays);

	return { regular: nodesLinksMain, reduced: nodesLinksReduced };
}

// ✅ normalize country keys for matching map geographies <-> credits keys
function normalizeCountryKey(name) {
	const raw = String(name || '').trim();
	if (!raw) return '';

	const lower = raw.toLowerCase().trim();

	// common aliases
	if (['usa', 'u.s.a', 'u.s.a.', 'united states', 'united states of america'].includes(lower))
		return 'united states of america';
	if (['uk', 'u.k', 'u.k.', 'united kingdom', 'great britain'].includes(lower)) return 'united kingdom';

	return lower
		.replace(/&/g, 'and')
		.replace(/[^a-z0-9 ]/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

// ✅ build per-country publication groups from publications[].credits
function buildCountryGroupsFromPublications(publications) {
	const byCountry = new Map();

	(publications || []).forEach((pub) => {
		const credits = pub?.credits && typeof pub.credits === 'object' ? pub.credits : null;
		if (!credits) return;

		Object.entries(credits).forEach(([countryName, people]) => {
			const key = normalizeCountryKey(countryName);
			if (!key) return;

			if (!byCountry.has(key)) {
				byCountry.set(key, {
					key,
					country: String(countryName),
					publications: [],
				});
			}

			const collaborators = Array.isArray(people) ? people.filter(Boolean).map(String) : [];

			byCountry.get(key).publications.push({
				id: `${String(pub._id)}-${key}`,
				pubId: String(pub._id),
				country: String(countryName),

				title: pub?.title ? String(pub.title) : '',
				url: pub?.url ? String(pub.url) : '',
				year: pub?.year ?? null,
				authors: pub?.authors ? String(pub.authors) : '',
				publisher: pub?.publisher ? String(pub.publisher) : '',
				doi: pub?.doi ? String(pub.doi) : '',
				date: pub?.date ? String(pub.date) : '',
				image: pub?.image ? String(pub.image) : '',

				collaborators,
			});
		});
	});

	const groups = Array.from(byCountry.values()).map((g) => ({
		...g,
		count: g.publications.length,
	}));

	groups.sort((a, b) => b.count - a.count || a.country.localeCompare(b.country));
	return groups;
}

function Collaboration() {
	// -------------------- FORCE GRAPH (collaborations endpoint) --------------------
	const [isLoading, setIsLoading] = useState(true);
	const [loadError, setLoadError] = useState(null);

	// ✅ View toggle: true = MAP, false = GRAPH
	const [showMap, setShowMap] = useState(true);

	const graphsRef = useRef(null);
	const [fullPlot, setFullPlot] = useState(false);
	const [graphData, setGraphData] = useState({ nodes: [], links: [] });

	// responsive sizing for graph
	const graphShellRef = useRef(null);
	const [graphDims, setGraphDims] = useState({ width: 900, height: 700 });

	const graphOptions = useMemo(() => ({}), []);

	useEffect(() => {
		// Only measure when the GRAPH view is visible
		if (showMap) return;
		if (isLoading || loadError) return;

		const el = graphShellRef.current;
		if (!el) return;

		const update = () => {
			const rect = el.getBoundingClientRect();
			const w = Math.max(280, rect.width || 0);

			const width = Math.min(1400, w);

			let height;
			if (w < 600) height = Math.round(width * 1.95);
			else if (w < 1024) height = Math.round(width * 0.9);
			else height = Math.round(width * 0.72);

			setGraphDims({
				width: Math.max(280, width),
				height: Math.max(420, Math.min(1200, height)),
			});
		};

		update();

		let ro;
		if (typeof ResizeObserver !== 'undefined') {
			ro = new ResizeObserver(() => update());
			ro.observe(el);
		} else {
			window.addEventListener('resize', update);
		}

		return () => {
			if (ro) ro.disconnect();
			else window.removeEventListener('resize', update);
		};
	}, [showMap, isLoading, loadError]);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const fetchCollaborations = async () => {
			try {
				setIsLoading(true);
				setLoadError(null);

				const response = await axios.get('/api/data/collaborations', { signal: controller.signal });
				const payload = response?.data;

				let data = [];
				if (Array.isArray(payload)) data = payload;
				else if (Array.isArray(payload?.collaborations)) data = payload.collaborations;
				else if (Array.isArray(payload?.data)) data = payload.data;

				if (!isMounted) return;

				const bothGraphs = createAdjacencyList(data);
				graphsRef.current = bothGraphs;

				setGraphData(fullPlot ? bothGraphs.regular : bothGraphs.reduced);
			} catch (err) {
				if (err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') return;

				if (isMounted) {
					setLoadError(err?.message || 'Failed to load collaborations');
					setGraphData({ nodes: [], links: [] });
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

	useEffect(() => {
		if (!graphsRef.current) return;
		setGraphData(fullPlot ? graphsRef.current.regular : graphsRef.current.reduced);
	}, [fullPlot]);

	// -------------------- PUBLICATIONS MAP (publications endpoint) --------------------
	const [pubLoading, setPubLoading] = useState(true);
	const [pubError, setPubError] = useState(null);
	const [countryGroups, setCountryGroups] = useState([]);
	const [selectedCountryKey, setSelectedCountryKey] = useState(null);

	// ✅ responsive sizing for MAP
	const mapShellRef = useRef(null);
	const [mapHeight, setMapHeight] = useState(620);

	useEffect(() => {
		// Only measure when the MAP view is visible
		if (!showMap) return;
		if (pubLoading || pubError) return;

		const el = mapShellRef.current;
		if (!el) return;

		const update = () => {
			const rect = el.getBoundingClientRect();
			const w = Math.max(280, rect.width || 0);

			// Height behavior:
			// - Mobile: taller
			// - Tablet: moderate
			// - Desktop: classic map aspect (~0.55-0.6)
			let h;
			if (w < 600)
				h = Math.round(w * 0.88); // phones: longer/taller
			else if (w < 1024)
				h = Math.round(w * 0.68); // tablets
			else h = Math.round(w * 0.58); // desktop

			setMapHeight(Math.max(420, Math.min(900, h)));
		};

		update();

		let ro;
		if (typeof ResizeObserver !== 'undefined') {
			ro = new ResizeObserver(() => update());
			ro.observe(el);
		} else {
			window.addEventListener('resize', update);
		}

		return () => {
			if (ro) ro.disconnect();
			else window.removeEventListener('resize', update);
		};
	}, [showMap, pubLoading, pubError]);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const fetchPublications = async () => {
			try {
				setPubLoading(true);
				setPubError(null);

				const res = await axios.get('/api/data/publications', { signal: controller.signal });
				const payload = res?.data;

				let publications = [];
				if (Array.isArray(payload)) publications = payload;
				else if (Array.isArray(payload?.publications)) publications = payload.publications;
				else if (Array.isArray(payload?.data)) publications = payload.data;

				if (!isMounted) return;

				const groups = buildCountryGroupsFromPublications(publications);
				setCountryGroups(groups);
			} catch (err) {
				if (err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') return;
				if (isMounted) setPubError(err?.message || 'Failed to load publications');
			} finally {
				if (isMounted) setPubLoading(false);
			}
		};

		fetchPublications();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	// default selection: Canada if present, else first available
	useEffect(() => {
		if (!countryGroups.length) return;

		if (selectedCountryKey && countryGroups.some((g) => g.key === selectedCountryKey)) return;

		const canadaKey = normalizeCountryKey('Canada');
		const canada = countryGroups.find((g) => g.key === canadaKey);

		setSelectedCountryKey(canada ? canada.key : countryGroups[0].key);
	}, [countryGroups, selectedCountryKey]);

	const selectedCountry = useMemo(
		() => countryGroups.find((g) => g.key === selectedCountryKey) || null,
		[countryGroups, selectedCountryKey],
	);

	return (
		<Container maxWidth="lg" sx={{ mx: 'auto' }}>
			<StyledHeading>Collaborations</StyledHeading>

			<StyledCollabs
				className="map-embed-shell"
				style={{
					width: '100%',
					maxWidth: '100%',
					minWidth: 0,
					height: 'auto',
					paddingBottom: 48,
				}}
			>
				{isLoading && <div style={{ padding: 12 }}>Loading collaborations...</div>}
				{loadError && !isLoading && <div style={{ padding: 12 }}>{`Failed to load: ${String(loadError)}`}</div>}
				{!isLoading && !loadError && (
					<div className="view-toggle-row">
						<span className="view-toggle-title">World Collaborations</span>
						<div className="view-toggle-control">
							<span className="view-toggle-label">Map</span>
							<button
								type="button"
								onClick={() => setShowMap((prev) => !prev)}
								// ✅ green/ON = Graph (matches your Detailed View toggle behavior)
								className={`map-toggle ${showMap ? 'map-toggle--off' : 'map-toggle--on'}`}
								aria-label="Toggle between Map and Graph view"
								aria-pressed={!showMap}
							>
								<span className={`map-toggle__knob ${showMap ? '' : 'map-toggle__knob--right'}`} />
							</button>
							<span className="view-toggle-label">Graph</span>
						</div>
					</div>
				)}

				{!isLoading && !loadError && (
					<div
						className="collabs-stack"
						style={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							gap: 24,
							position: 'relative',
						}}
					>
						{!showMap ? (
							<>
								{/* ---------------- GRAPH ---------------- */}
								<div style={{ zIndex: 3, display: 'flex', flexDirection: 'column', gap: 20 }}>
									<div style={{ display: 'flex', flexDirection: 'column' }}>
										<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
											<span style={{ fontWeight: 700, fontSize: 14 }}>Detailed View</span>
											<button
												type="button"
												onClick={() => setFullPlot((prev) => !prev)}
												className={`plot-toggle ${fullPlot ? 'plot-toggle--on' : 'plot-toggle--off'}`}
												aria-label="Toggle reduced/full graph"
											>
												<span className={`plot-toggle__knob ${fullPlot ? 'plot-toggle__knob--right' : ''}`} />
											</button>
										</div>
										<ForceGraphLegend items={legendItems} />
									</div>

									<div
										ref={graphShellRef}
										style={{
											width: '100%',
											minWidth: 0,
											maxWidth: '100%',
										}}
									>
										<ForceDirectedGraph
											graph={graphData}
											width={graphDims.width}
											height={graphDims.height}
											options={graphOptions}
										/>
									</div>
								</div>
							</>
						) : (
							<>
								{/* ---------------- MAP (publications by country) ---------------- */}
								<div className="collabs-map" style={{ zIndex: 2 }}>
									{pubLoading && <div style={{ padding: 12 }}>Loading publications map...</div>}
									{pubError && !pubLoading && (
										<div style={{ padding: 12 }}>{`Failed to load publications: ${String(pubError)}`}</div>
									)}

									{!pubLoading && !pubError && (
										<div
											ref={mapShellRef}
											style={{
												width: '100%',
												minWidth: 0,
												maxWidth: '100%',
											}}
										>
											<PublicationsCountryMap
												countryGroups={countryGroups}
												selectedCountryKey={selectedCountryKey}
												onSelectCountryKey={setSelectedCountryKey}
												height={mapHeight}
												showControls
											/>
										</div>
									)}
								</div>

								{/* ---------------- DETAILS ---------------- */}
								<div className="collabs-details" style={{ zIndex: 1 }}>
									{!pubLoading && !pubError && (
										<CountryPublicationsDetails selectedCountry={selectedCountry} itemsPerPage={5} />
									)}
								</div>
							</>
						)}
					</div>
				)}
			</StyledCollabs>
		</Container>
	);
}

export default Collaboration;
