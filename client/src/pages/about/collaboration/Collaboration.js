import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';

import StyledHeading from '../../../styles/StyledHeading';
import StyledCollabs from './CollaborationStyles';
import ForceDirectedGraph from './collaboration-components/ForceDirectedGraph';

import CollaborationsMap from './collaboration-components/CollaborationsMap';
import CityCollaborationsDetails from './collaboration-components/CityCollaborationsDetails';

import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';

const FALLBACK_COORDS = {
	'Toronto|Canada': { latitude: 43.651, longitude: -79.347 },
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

function helper_createNodesAndLinks(adjacency, displays) {
	const nodeObjArray = [];
	for (const [key, value] of displays.entries()) {
		if (adjacency.has(key)) nodeObjArray.push({ id: key, color: value.color, shape: value.symbol, size: value.size });
	}

	const links = [];
	const seen = new Map();
	for (const [node, nei] of adjacency) {
		for (const neighbor of nei) {
			if ((seen.has(node) && seen.get(node).has(neighbor)) || (seen.has(neighbor) && seen.get(neighbor).has(node)))
				continue;
			links.push({ source: node, target: neighbor });
			if (!seen.has(node)) seen.set(node, new Set());
			if (!seen.has(neighbor)) seen.set(neighbor, new Set());
			seen.get(node).add(neighbor);
			seen.get(neighbor).add(node);
		}
	}

	return { nodes: nodeObjArray, links };
}

function createAdjacencyList(records) {
	const adjacency = new Map();
	adjacency.set('BHK', new Set());

	const adjacencyReduced = new Map();
	adjacencyReduced.set('BHK', new Set());

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
		adjacencyReduced.get('BHK').add(main);
		if (!adjacencyReduced.has(main)) adjacencyReduced.set(main, new Set());
		adjacencyReduced.get(main).add('BHK');

		for (const member of membersandcontacts) {
			if (!adjacency.has(member)) adjacency.set(member, new Set());

			adjacency.get('BHK').add(member);
			adjacency.get(member).add('BHK');

			adjacency.get(member).add(main);
			displays.set(member, { color: '#15d9bb', symbol: 'cross', size: 100 });

			if (!adjacency.has(main)) adjacency.set(main, new Set());
			adjacency.get(main).add(member);

			displays.set(main, { color: '#0021f7ff', symbol: 'diamond', size: 160 });

			others.forEach((other) => {
				if (!other) return;

				adjacency.get(main).add(other);
				if (!adjacency.has(other)) adjacency.set(other, new Set());
				adjacency.get(other).add(main);

				// Reduced graph: only connect main collaborators to other collaborators
				adjacencyReduced.get(main).add(other);
				if (!adjacencyReduced.has(other)) adjacencyReduced.set(other, new Set());
				adjacencyReduced.get(other).add(main);

				if (!displays.has(other)) displays.set(other, { color: '#ed08d2ff', symbol: 'wye', size: 120 });
			});
		}
	});

	const nodesLinksMain = helper_createNodesAndLinks(adjacency, displays);
	const nodesLinksReduced = helper_createNodesAndLinks(adjacencyReduced, displays);

	return { regular: nodesLinksMain, reduced: nodesLinksReduced };
}

const Collaboration = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [loadError, setLoadError] = useState(null);
	const [rows, setRows] = useState([]);

	// ✅ store BOTH graphs in a ref so they persist across renders
	const graphsRef = useRef(null);

	// ✅ toggle state
	const [reducedGraphData, setReducedGraphData] = useState(true);

	// ✅ current graph data to render
	const [graphData, setGraphData] = useState({ nodes: [], links: [] });

	const [selectedCityKey, setSelectedCityKey] = useState(null);

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const fetchCollaborations = async () => {
			try {
				setIsLoading(true);
				setLoadError(null);

				const response = await axios.get('/api/data/collaborations', { signal: controller.signal });
				const payload = response?.data;

				const data = Array.isArray(payload)
					? payload
					: Array.isArray(payload?.collaborations)
						? payload.collaborations
						: Array.isArray(payload?.data)
							? payload.data
							: [];

				if (!isMounted) return;

				setRows(data);

				// ✅ build both graphs once and store
				const bothGraphs = createAdjacencyList(data);
				graphsRef.current = bothGraphs;

				// ✅ set initial graph to match toggle
				setGraphData(reducedGraphData ? bothGraphs.reduced : bothGraphs.regular);
			} catch (err) {
				if (err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') return;

				console.error('Failed to fetch collaborations:', err);
				if (isMounted) {
					setLoadError(err?.message || 'Failed to load collaborations');
					setRows([]);
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// ✅ when toggle changes, swap graphData from ref
	useEffect(() => {
		if (!graphsRef.current) return;
		setGraphData(reducedGraphData ? graphsRef.current.reduced : graphsRef.current.regular);
	}, [reducedGraphData]);

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

	return (
		<Container maxWidth="lg">
			<StyledHeading>Collaborations</StyledHeading>

			<StyledCollabs
				className="map-embed-shell"
				style={{
					width: '100%',
					maxWidth: '100%',
					minWidth: 0,
					height: 'auto',
					overflow: 'visible',
					paddingBottom: 48,
				}}
			>
				{isLoading && <div style={{ padding: 12 }}>Loading collaborations...</div>}
				{loadError && !isLoading && <div style={{ padding: 12 }}>Failed to load: {loadError}</div>}

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
						<div style={{ zIndex: 3 }}>
							<ToggleButton
								value="reduced"
								selected={reducedGraphData}
								onChange={() => setReducedGraphData((prev) => !prev)}
								sx={{ mb: 2 }}
							>
								<CheckIcon />
								<span style={{ marginLeft: 8 }}>{reducedGraphData ? 'Reduced graph' : 'Full graph'}</span>
							</ToggleButton>

							{/* ✅ key forces D3 graph to remount when toggled (important for many D3 wrappers) */}
							<ForceDirectedGraph graph={graphData} width={1000} height={1000} options={{}} />
						</div>

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
					</div>
				)}
			</StyledCollabs>
		</Container>
	);
};

export default Collaboration;
