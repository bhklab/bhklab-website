// src/components/LabCollaborationsGlobe3D.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import { scaleSqrt } from 'd3-scale';
import { collaborationsRaw } from './data/collaborationsData';

const STATUS_COLORS = {
    Completed: '#10b981',
    Ongoing: '#f59e0b',
    'Not started': '#6366f1',
    Unknown: '#94a3b8'
};

const FALLBACK_COORDS = {
    // Handles the SGC record that has "City" but no lat/lon
    'Toronto|Canada': { latitude: 43.651, longitude: -79.347 }
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
        id: row?._id?.$oid || `row-${index}`,
        mainCollab: clean(row['main-collab']),
        otherCollabs: maybe(row['other-collabs']),
        organization: clean(row.organization),
        country,
        city,
        startYear: Number(row['start-year']) || null,
        type: normalizeType(row.type),
        project: clean(row.project),
        contact: maybe(row.contact),
        members: maybe(row.members),
        role: maybe(row.role),
        status: normalizeStatus(row.status),
        statusRaw: clean(row.status),
        outputs: maybe(row.outputs),
        latitude: lat,
        longitude: lon,
        hasCoordinates: Number.isFinite(lat) && Number.isFinite(lon)
    };
}

function groupByCity(records) {
    const map = new Map();

    records.forEach(r => {
        if (!r.hasCoordinates) return;
        const key = `${r.city}|${r.country}|${r.latitude}|${r.longitude}`;

        if (!map.has(key)) {
            map.set(key, {
                key,
                city: r.city,
                country: r.country,
                latitude: r.latitude,
                longitude: r.longitude,
                collaborations: []
            });
        }

        map.get(key).collaborations.push(r);
    });

    return Array.from(map.values()).map(group => {
        const statusCounts = group.collaborations.reduce((acc, c) => {
            acc[c.status] = (acc[c.status] || 0) + 1;
            return acc;
        }, {});

        const dominantStatus = Object.entries(statusCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';

        const years = group.collaborations.map(c => c.startYear).filter(y => Number.isFinite(y));

        return {
            ...group,
            count: group.collaborations.length,
            statusCounts,
            dominantStatus,
            types: [...new Set(group.collaborations.map(c => c.type))],
            minYear: years.length ? Math.min(...years) : null,
            maxYear: years.length ? Math.max(...years) : null
        };
    });
}

function Badge({ children }) {
    return (
        <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-700">
            {children}
        </span>
    );
}

export default function LabCollaborationsGlobe3D() {
    const globeRef = useRef(null);
    const globeWrapRef = useRef(null);

    const records = useMemo(() => collaborationsRaw.map((row, i) => normalizeRecord(row, i)), []);

    const typeOptions = useMemo(() => {
        const types = Array.from(new Set(records.map(r => r.type).filter(Boolean))).sort();
        return ['All', ...types];
    }, [records]);

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');
    const [selectedCityKey, setSelectedCityKey] = useState(null);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [autoRotate, setAutoRotate] = useState(true);

    const [globeSize, setGlobeSize] = useState({ width: 1000, height: 620 });

    useEffect(() => {
        function onKeyDown(e) {
            if (e.key === 'Escape') setIsPopupOpen(false);
        }
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    useEffect(() => {
        if (!globeWrapRef.current) return;

        const el = globeWrapRef.current;

        const updateSize = () => {
            const width = Math.max(320, el.clientWidth || 1000);
            const height = Math.max(420, Math.min(760, Math.round(width * 0.62)));
            setGlobeSize({ width, height });
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
    }, []);

    useEffect(() => {
        const globe = globeRef.current;
        if (!globe) return;

        const controls = globe.controls();
        if (!controls) return;

        controls.enablePan = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.minDistance = 120;
        controls.maxDistance = 550;
        controls.autoRotate = autoRotate;
        controls.autoRotateSpeed = 0.35;
    }, [autoRotate, globeSize]);

    const filteredRecords = useMemo(() => {
        const q = search.toLowerCase().trim();

        return records.filter(r => {
            if (statusFilter !== 'All' && r.status !== statusFilter) return false;
            if (typeFilter !== 'All' && r.type !== typeFilter) return false;

            if (!q) return true;

            const haystack = [
                r.city,
                r.country,
                r.project,
                r.organization,
                r.mainCollab,
                r.otherCollabs,
                r.contact,
                r.members,
                r.role,
                r.type,
                r.status,
                r.outputs
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

            return haystack.includes(q);
        });
    }, [records, search, statusFilter, typeFilter]);

    const cityGroups = useMemo(() => {
        return groupByCity(filteredRecords).sort((a, b) => b.count - a.count || a.city.localeCompare(b.city));
    }, [filteredRecords]);

    const selectedCity = useMemo(() => {
        if (!cityGroups.length) return null;
        return cityGroups.find(c => c.key === selectedCityKey) || cityGroups[0];
    }, [cityGroups, selectedCityKey]);

    const totals = useMemo(() => {
        const countries = new Set(filteredRecords.map(r => r.country));
        const cities = new Set(filteredRecords.filter(r => r.hasCoordinates).map(r => `${r.city}|${r.country}`));
        const unplaced = filteredRecords.filter(r => !r.hasCoordinates).length;

        return {
            collaborations: filteredRecords.length,
            countries: countries.size,
            cities: cities.size,
            unplaced
        };
    }, [filteredRecords]);

    const globePoints = useMemo(() => {
        if (!cityGroups.length) return [];

        const maxCount = Math.max(1, ...cityGroups.map(c => c.count));
        const radiusScale = scaleSqrt().domain([1, maxCount]).range([0.26, 0.85]);
        const altitudeScale = scaleSqrt().domain([1, maxCount]).range([0.02, 0.11]);

        return cityGroups.map(city => ({
            ...city,
            color: STATUS_COLORS[city.dominantStatus] || STATUS_COLORS.Unknown,
            pointRadius: radiusScale(city.count),
            pointAltitude: altitudeScale(city.count)
        }));
    }, [cityGroups]);

    const zoomByFactor = factor => {
        const globe = globeRef.current;
        if (!globe) return;

        const pov = globe.pointOfView();
        const currentAlt = Number.isFinite(pov?.altitude) ? pov.altitude : 2.1;
        const nextAlt = Math.max(0.7, Math.min(4.2, currentAlt * factor));

        globe.pointOfView({ lat: pov?.lat ?? 20, lng: pov?.lng ?? 0, altitude: nextAlt }, 500);
    };

    const resetView = () => {
        const globe = globeRef.current;
        if (!globe) return;
        globe.pointOfView({ lat: 20, lng: 0, altitude: 2.1 }, 900);

        const controls = globe.controls();
        if (controls) {
            controls.autoRotate = autoRotate;
        }
    };

    const focusCity = city => {
        const globe = globeRef.current;
        if (!globe || !city) return;
        globe.pointOfView({ lat: city.latitude, lng: city.longitude, altitude: 1.45 }, 1000);
    };

    const pointLabelHtml = city => {
        const statuses = Object.entries(city.statusCounts || {})
            .map(([k, v]) => `${k}: ${v}`)
            .join(' • ');

        return `
      <div style="
        background: rgba(255,255,255,0.96);
        color: #0f172a;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 8px 10px;
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
        font-size: 12px;
        box-shadow: 0 8px 24px rgba(15,23,42,0.12);
        max-width: 240px;
      ">
        <div style="font-weight: 700; margin-bottom: 2px;">
          ${city.city}, ${city.country}
        </div>
        <div style="color: #475569;">
          ${city.count} collaboration${city.count > 1 ? 's' : ''}
        </div>
        <div style="margin-top: 4px; color: #64748b;">
          ${statuses}
        </div>
      </div>
    `;
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-6">
            {/* Popup modal */}
            {isPopupOpen && selectedCity && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
                    onClick={() => setIsPopupOpen(false)}
                >
                    <div
                        className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-3 border-b border-slate-200 p-4">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900">
                                    {selectedCity.city}, {selectedCity.country}
                                </h2>
                                <p className="text-sm text-slate-600">
                                    {selectedCity.count} collaboration{selectedCity.count > 1 ? 's' : ''} •{' '}
                                    {selectedCity.minYear}–{selectedCity.maxYear}
                                </p>

                                <div className="mt-2 flex flex-wrap gap-1.5">
                                    {selectedCity.types.map(t => (
                                        <Badge key={t}>{t}</Badge>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                            >
                                Close
                            </button>
                        </div>

                        <div className="max-h-[70vh] overflow-y-auto p-4">
                            <div className="space-y-3">
                                {selectedCity.collaborations
                                    .slice()
                                    .sort((a, b) => (b.startYear || 0) - (a.startYear || 0))
                                    .map(c => (
                                        <div key={c.id} className="rounded-2xl border border-slate-200 p-3">
                                            <div className="flex flex-wrap items-start justify-between gap-2">
                                                <div>
                                                    <div className="text-sm font-semibold text-slate-900">
                                                        {c.project || 'Untitled project'}
                                                    </div>
                                                    <div className="text-xs text-slate-600">
                                                        {c.organization || 'Unknown org'} • {c.startYear || 'N/A'}
                                                    </div>
                                                </div>

                                                <span
                                                    className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white"
                                                    style={{
                                                        background: STATUS_COLORS[c.status] || STATUS_COLORS.Unknown
                                                    }}
                                                >
                                                    {c.status}
                                                </span>
                                            </div>

                                            <div className="mt-2 space-y-1 text-xs text-slate-700">
                                                {c.type && (
                                                    <p>
                                                        <span className="font-medium">Type:</span> {c.type}
                                                    </p>
                                                )}
                                                {c.mainCollab && (
                                                    <p>
                                                        <span className="font-medium">Main collaborator:</span>{' '}
                                                        {c.mainCollab}
                                                    </p>
                                                )}
                                                {c.otherCollabs && (
                                                    <p>
                                                        <span className="font-medium">Other collaborators:</span>{' '}
                                                        {c.otherCollabs}
                                                    </p>
                                                )}
                                                {c.contact && (
                                                    <p>
                                                        <span className="font-medium">Contact:</span> {c.contact}
                                                    </p>
                                                )}
                                                {c.members && (
                                                    <p>
                                                        <span className="font-medium">Members:</span> {c.members}
                                                    </p>
                                                )}
                                                {c.role && (
                                                    <p>
                                                        <span className="font-medium">Role:</span> {c.role}
                                                    </p>
                                                )}
                                                {c.outputs && (
                                                    <p>
                                                        <span className="font-medium">Outputs:</span> {c.outputs}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mx-auto max-w-7xl space-y-4">
                {/* Header + Filters */}
                <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-slate-900">
                                Global Lab Collaborations Globe (3D)
                            </h1>
                            <p className="mt-1 text-sm text-slate-600">
                                Drag to rotate the globe, scroll to zoom, and click a city marker for full details.
                            </p>
                        </div>

                        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 lg:w-auto">
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search collaborator, project, city..."
                                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                            />

                            <select
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value)}
                                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                            >
                                {['All', 'Completed', 'Ongoing', 'Not started'].map(s => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={typeFilter}
                                onChange={e => setTypeFilter(e.target.value)}
                                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                            >
                                {typeOptions.map(t => (
                                    <option key={t} value={t}>
                                        {t}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        <Badge>{totals.collaborations} collaborations</Badge>
                        <Badge>{totals.cities} cities</Badge>
                        <Badge>{totals.countries} countries</Badge>
                        <Badge>Marker size = # collaborations in city</Badge>
                        {totals.unplaced > 0 && <Badge>{totals.unplaced} missing coordinates</Badge>}
                    </div>
                </div>

                {/* Globe */}
                <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm text-slate-600">
                            Hover markers for quick counts. Click a marker to open the city popup.
                        </p>

                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => zoomByFactor(0.82)}
                                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
                            >
                                Zoom in
                            </button>
                            <button
                                onClick={() => zoomByFactor(1.22)}
                                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
                            >
                                Zoom out
                            </button>
                            <button
                                onClick={() => setAutoRotate(v => !v)}
                                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
                            >
                                {autoRotate ? 'Pause rotation' : 'Auto-rotate'}
                            </button>
                            <button
                                onClick={resetView}
                                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    <div
                        ref={globeWrapRef}
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950"
                        style={{ minHeight: 420 }}
                    >
                        <Globe
                            ref={globeRef}
                            width={globeSize.width}
                            height={globeSize.height}
                            backgroundColor="rgba(0,0,0,0)"
                            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                            atmosphereColor="#93c5fd"
                            atmosphereAltitude={0.16}
                            showAtmosphere={true}
                            pointsData={globePoints}
                            pointsMerge={false}
                            pointLat="latitude"
                            pointLng="longitude"
                            pointColor="color"
                            pointRadius="pointRadius"
                            pointAltitude="pointAltitude"
                            pointResolution={16}
                            pointLabel={pointLabelHtml}
                            onPointClick={point => {
                                setSelectedCityKey(point.key);
                                setIsPopupOpen(true);
                                setAutoRotate(false);
                                setTimeout(() => focusCity(point), 0);
                            }}
                            onGlobeReady={() => {
                                const globe = globeRef.current;
                                if (!globe) return;
                                globe.pointOfView({ lat: 20, lng: 0, altitude: 2.1 }, 0);
                                const controls = globe.controls();
                                if (controls) {
                                    controls.enablePan = false;
                                    controls.enableDamping = true;
                                    controls.dampingFactor = 0.08;
                                    controls.autoRotate = autoRotate;
                                    controls.autoRotateSpeed = 0.35;
                                    controls.minDistance = 120;
                                    controls.maxDistance = 550;
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
