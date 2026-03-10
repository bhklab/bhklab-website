import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';

import StyledHeading from '../../../styles/StyledHeading';
import StyledCollabs from './CollaborationStyles';
import ForceDirectedGraph from './collaboration-components/ForceDirectedGraph';

import CollaborationsMap from './collaboration-components/CollaborationsMap';
import CityCollaborationsDetails from './collaboration-components/CityCollaborationsDetails';
import { set } from 'mongoose';

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

function createAdjacencyList(records) {
	const adjacency = new Map();
	adjacency.set('BHK', new Set());
	const displays = new Map();
	displays.set('BHK', { color: '#ff0000ff', symbol: 'star', size: 200 }); // BHK node in red
	console.log('Creating adjacency list from records:', records);
	records.forEach((r) => {
		const main = r.maincollab;
		const others = r.othercollabs !== 'NA' ? r.othercollabs.split(',').map((s) => s.trim()) : [];
		const members = r.members !== 'NA' ? r.members.split(',').map((s) => s.trim()) : [];
		const contact = r.contact !== 'NA' ? r.contact.split(',').map((s) => s.trim()) : [];

		if (members.length > 0) {
			for (const member of members) {
				if (!adjacency.has(member)) adjacency.set(member, new Set());
				adjacency.get('BHK').add(member);
				adjacency.get(member).add('BHK');
				adjacency.get(member).add(main);
				displays.set(member, { color: '#15d9bb', symbol: 'cross', size: 100 }); // Collaborators in teal

				if (!adjacency.has(main)) adjacency.set(main, new Set());
				adjacency.get(main).add(member);
				displays.set(main, { color: '#0021f7ff', symbol: 'diamond', size: 160 }); // Main collaborator in blue
				others.forEach((other) => {
					if (other) {
						adjacency.get(main).add(other);
						if (!adjacency.has(other)) adjacency.set(other, new Set());
						adjacency.get(other).add(main);
						if (!displays.has(other)) displays.set(other, { color: '#ed08d2ff', symbol: 'wye', size: 120 }); // Other collaborators in magenta
					}
				});
			}
		} else {
			for (const contactPerson of contact) {
				if (!adjacency.has(contactPerson)) adjacency.set(contactPerson, new Set());
				adjacency.get('BHK').add(contactPerson);
				adjacency.get(contactPerson).add('BHK');
				adjacency.get(contactPerson).add(main);
				displays.set(contactPerson, { color: '#15d9bb', symbol: 'cross', size: 100 });
				if (!adjacency.has(main)) adjacency.set(main, new Set());
				adjacency.get(main).add(contactPerson);
				displays.set(main, { color: '#0021f7ff', symbol: 'diamond', size: 160 });
				others.forEach((other) => {
					if (other) {
						adjacency.get(main).add(other);
						if (!adjacency.has(other)) adjacency.set(other, new Set());
						adjacency.get(other).add(main);
						if (!displays.has(other)) displays.set(other, { color: '#ed08d2ff', symbol: 'wye', size: 120 });
					}
				});
			}
		}
	});
	//iterate through displays map and convert to object
	const nodeObjArray = [];
	for (const [key, value] of displays.entries()) {
		nodeObjArray.push({ id: key, color: value.color, shape: value.symbol, size: value.size });
	}
	const links = [];
	const seen = new Map(); // To track seen pairs and avoid duplicates
	for (const [node, nei] of adjacency) {
		for (const neighbor of nei) {
			if ((seen.has(node) && seen.get(node).has(neighbor)) || (seen.has(neighbor) && seen.get(neighbor).has(node)))
				continue; // Skip if this pair has already been processed
			links.push({ source: node, target: neighbor });
			if (!seen.has(node)) seen.set(node, new Set());
			if (!seen.has(neighbor)) seen.set(neighbor, new Set());
			seen.get(node).add(neighbor);
			seen.get(neighbor).add(node);
		}
	}
	const data = {
		nodes: nodeObjArray,
		links,
	};
	console.log(data);
	return data;
}

const Collaboration = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [loadError, setLoadError] = useState(null);
	const [rows, setRows] = useState([]);
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

				if (isMounted) {
					setRows(data);
					const info = createAdjacencyList(data);
					setGraphData(info);
				}
			} catch (err) {
				if (err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') return;

				console.error('Failed to fetch collaborations:', err);
				if (isMounted) {
					setLoadError(err?.message || 'Failed to load collaborations');
					setRows([]);
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
				// Key: prevent parent clipping/overlap with next section
				style={{
					width: '100%',
					maxWidth: '100%',
					minWidth: 0,
					height: 'auto',
					overflow: 'visible',
					paddingBottom: 48, // ensures next home section doesn’t overlap
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
							gap: 24, // ✅ real spacing between map + details
							position: 'relative',
						}}
					>
						<div style={{ position: 'relative', zIndex: 3 }}>
							<ForceDirectedGraph graph={graphData} width={900} height={1000} options={{}} />
						</div>

						<div style={{ position: 'relative', zIndex: 2 }}>
							<CollaborationsMap
								height={700}
								cityGroups={cityGroups}
								selectedCityKey={selectedCityKey}
								onSelectCityKey={setSelectedCityKey}
								showControls={true}
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
