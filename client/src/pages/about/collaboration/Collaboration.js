import React, { useEffect, useRef, useState, useMemo } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import StyledHeading from '../../../styles/StyledHeading';
import StyledCollabs from './CollaborationStyles';
import ForceDirectedGraph from './collaboration-components/ForceDirectedGraph';
import ForceGraphLegend from './collaboration-components/ForceGraphLegend';

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
		// NOTE: your API objects use maincollab/othercollabs — keep this as-is
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

function Collaboration() {
	const [isLoading, setIsLoading] = useState(true);
	const [loadError, setLoadError] = useState(null);

	// store BOTH graphs in a ref so they persist across renders
	const graphsRef = useRef(null);

	// toggle state
	const [fullPlot, setFullPlot] = useState(false);

	// current graph data to render
	const [graphData, setGraphData] = useState({ nodes: [], links: [] });

	// responsive sizing
	const graphShellRef = useRef(null);
	const [graphDims, setGraphDims] = useState({ width: 900, height: 700 });

	// memo options (avoid re-render loop from options={{}})
	const graphOptions = useMemo(
		() => ({
			// keep your defaults here if you want
		}),
		[],
	);

	useEffect(() => {
		// Don't attach observers until the graph is actually rendered.
		if (isLoading || loadError) return;

		const el = graphShellRef.current;
		if (!el) return;

		const update = () => {
			// Use getBoundingClientRect for more reliable measurement than clientWidth in some layouts.
			const rect = el.getBoundingClientRect();
			const w = Math.max(280, rect.width || 0);

			// Bigger on desktop (up to 1400), fill whatever width the container provides
			const width = Math.min(1400, w);

			// Taller on mobile, larger overall on desktop
			let height;
			if (w < 600) {
				// phones: a bit longer (taller)
				height = Math.round(width * 1.85);
			} else if (w < 1024) {
				// tablets: moderately tall
				height = Math.round(width * 0.95);
			} else {
				// desktop: bigger + reasonably tall
				height = Math.round(width * 0.72);
			}

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
	}, [isLoading, loadError]);

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

				if (Array.isArray(payload)) {
					data = payload;
				} else if (Array.isArray(payload?.collaborations)) {
					data = payload.collaborations;
				} else if (Array.isArray(payload?.data)) {
					data = payload.data;
				}

				if (!isMounted) return;

				// setRows(data);

				// build both graphs once and store
				const bothGraphs = createAdjacencyList(data);
				graphsRef.current = bothGraphs;

				// set initial graph to match toggle
				setGraphData(fullPlot ? bothGraphs.regular : bothGraphs.reduced);
			} catch (err) {
				if (err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') return;

				if (isMounted) {
					setLoadError(err?.message || 'Failed to load collaborations');
					// setRows([]);
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
		// include reducedGraphData only if you want initial fetch to respect it;
		// otherwise leave it out and rely on the toggle effect below.
	}, []);

	// when toggle changes, swap graphData from ref
	useEffect(() => {
		if (!graphsRef.current) return;
		setGraphData(fullPlot ? graphsRef.current.regular : graphsRef.current.reduced);
	}, [fullPlot]);
	/*
	const records = useMemo(() => (Array.isArray(rows) ? rows : []).map((r, i) => normalizeRecord(r, i)), [rows]);

	const cityGroups = useMemo(
		() => groupByCity(records).sort((a, b) => b.count - a.count || a.city.localeCompare(b.city)),
		[records],
	);

	useEffect(() => {
		if (!cityGroups.length) return;

		if (selectedCityKey && cityGroups.some((g) => g.key === selectedCityKey)) return;

		const toronto = cityGroups.find((g) => g.city === 'Toronto' && g.country === 'Canada');
		setSelectedCityKey(toronto?.key || cityGroups[0].key);
	}, [cityGroups, selectedCityKey]);

	const selectedCity = useMemo(
		() => cityGroups.find((g) => g.key === selectedCityKey) || null,
		[cityGroups, selectedCityKey],
	);
	*/

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
					<div
						style={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							gap: 24,
							position: 'relative',
						}}
					>
						<div style={{ zIndex: 3, display: 'flex', flexDirection: 'column', gap: '20px' }}>
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<div style={{ display: 'flex', alignItems: 'center ', gap: '10px' }}>
									<span style={{ fontWeight: '700', fontSize: '14px' }}>Detailed View</span>
									<button
										type="button"
										onClick={() => setFullPlot((prev) => !prev)}
										className={`plot-toggle ${fullPlot ? 'plot-toggle--on' : 'plot-toggle--off'}`}
									>
										<span className={`plot-toggle__knob ${fullPlot ? 'plot-toggle__knob--right' : ''}`} />
									</button>
								</div>
								<ForceGraphLegend items={legendItems} />
							</div>

							{/* ✅ key forces D3 graph to remount when toggled (important for many D3 wrappers) */}
							{/* ✅ This wrapper provides the measured width for the graph */}
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

						{/*
						<div style={{ position: 'relative', zIndex: 2 }}>
							<CollaborationsMap
								height={700}
								cityGroups={cityGroups}
								selectedCityKey={selectedCityKey}
								onSelectCityKey={setSelectedCityKey}
								showControls
							/>
						</div>

						<div style={{ position: 'relative', zIndex: 1 }}>
							<CityCollaborationsDetails selectedCity={selectedCity} itemsPerPage={5} />
						</div>
						*/}
					</div>
				)}
			</StyledCollabs>
		</Container>
	);
}

export default Collaboration;
