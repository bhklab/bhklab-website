// src/components/LabCollaborationsMap2D.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { scaleSqrt } from 'd3-scale';
import { collaborationsRaw } from './data/collaborationsData';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

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

export default function LabCollaborationsMap2D({ className = '', height = 560 }) {
    const mapWrapRef = useRef(null);

    const [mapSize, setMapSize] = useState({
        width: 1000,
        height: typeof height === 'number' ? height : 560
    });

    const records = useMemo(() => collaborationsRaw.map((row, i) => normalizeRecord(row, i)), []);

    const typeOptions = useMemo(() => {
        const types = Array.from(new Set(records.map(r => r.type).filter(Boolean))).sort();
        return ['All', ...types];
    }, [records]);

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');
    const [selectedCityKey, setSelectedCityKey] = useState(null);

    const [zoom, setZoom] = useState(1);
    const [center, setCenter] = useState([0, 15]);

    const [tooltip, setTooltip] = useState(null); // {x,y,city,country,count}
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        function onKeyDown(e) {
            if (e.key === 'Escape') setIsPopupOpen(false);
        }
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    // Container-aware sizing for embedding inside any div
    useEffect(() => {
        if (!mapWrapRef.current) return;
        const el = mapWrapRef.current;

        const updateSize = () => {
            const width = Math.max(320, el.clientWidth || 1000);
            const nextHeight =
                typeof height === 'number' ? height : Math.max(420, Math.min(760, Math.round(width * 0.58)));

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

    // Bigger visible markers + easier click target
    const bubbleScale = useMemo(() => {
        const max = Math.max(1, ...cityGroups.map(c => c.count));
        // Increased size range for easier clicking
        return scaleSqrt().domain([1, max]).range([9, 28]);
    }, [cityGroups]);

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

    const focusCity = city => {
        if (!city) return;
        setCenter([city.longitude, city.latitude]);
        setZoom(2.1);
    };

    const mapScale = useMemo(() => {
        // Keep the globe-ish world projection size responsive inside the embed container
        return Math.max(120, Math.min(235, mapSize.width * 0.15));
    }, [mapSize.width]);

    return (
        <div className={`w-full bg-slate-50 p-4 md:p-6 ${className}`}>
            {/* Hover tooltip */}
            {tooltip && (
                <div
                    className="fixed z-40 pointer-events-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg"
                    style={{ left: tooltip.x + 10, top: tooltip.y + 10 }}
                >
                    <div className="font-semibold text-slate-900">
                        {tooltip.city}, {tooltip.country}
                    </div>
                    <div className="text-slate-600">
                        {tooltip.count} collaboration{tooltip.count > 1 ? 's' : ''}
                    </div>
                </div>
            )}

            {/* City popup modal */}
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

            <div className="w-full space-y-4">
                {/* Header + Filters */}
                <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-slate-900">
                                Global Lab Collaborations Map (2D)
                            </h1>
                            <p className="mt-1 text-sm text-slate-600">
                                Click a city bubble to open a popup with all collaborations.
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
                        <Badge>Bigger markers enabled</Badge>
                        {totals.unplaced > 0 && <Badge>{totals.unplaced} missing coordinates</Badge>}
                    </div>
                </div>

                {/* Map */}
                <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm text-slate-600">
                            Hover for quick counts. Click a bubble for the full city collaboration list.
                        </p>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setZoom(z => Math.min(6, +(z * 1.25).toFixed(2)))}
                                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
                            >
                                Zoom in
                            </button>
                            <button
                                onClick={() => setZoom(z => Math.max(1, +(z / 1.25).toFixed(2)))}
                                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
                            >
                                Zoom out
                            </button>
                            <button
                                onClick={() => {
                                    setCenter([0, 15]);
                                    setZoom(1);
                                }}
                                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    <div
                        ref={mapWrapRef}
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                        style={{ minHeight: Math.max(360, mapSize.height) }}
                    >
                        <ComposableMap
                            projection="geoMercator"
                            projectionConfig={{ scale: mapScale }}
                            width={mapSize.width}
                            height={mapSize.height}
                            style={{ width: '100%', height: '100%' }}
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
                                        geographies.map(geo => (
                                            <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                style={{
                                                    default: {
                                                        fill: '#e2e8f0',
                                                        stroke: '#cbd5e1',
                                                        strokeWidth: 0.5,
                                                        outline: 'none'
                                                    },
                                                    hover: {
                                                        fill: '#dbeafe',
                                                        stroke: '#93c5fd',
                                                        strokeWidth: 0.6,
                                                        outline: 'none'
                                                    },
                                                    pressed: {
                                                        fill: '#bfdbfe',
                                                        outline: 'none'
                                                    }
                                                }}
                                            />
                                        ))
                                    }
                                </Geographies>

                                {cityGroups.map(city => {
                                    const r = bubbleScale(city.count);
                                    const color = STATUS_COLORS[city.dominantStatus] || STATUS_COLORS.Unknown;
                                    const isSelected = selectedCity?.key === city.key;

                                    return (
                                        <Marker key={city.key} coordinates={[city.longitude, city.latitude]}>
                                            <g
                                                role="button"
                                                tabIndex={0}
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    setSelectedCityKey(city.key);
                                                    setIsPopupOpen(true);
                                                    focusCity(city);
                                                }}
                                                onKeyDown={e => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        setSelectedCityKey(city.key);
                                                        setIsPopupOpen(true);
                                                        focusCity(city);
                                                    }
                                                }}
                                                onMouseEnter={e =>
                                                    setTooltip({
                                                        x: e.clientX,
                                                        y: e.clientY,
                                                        city: city.city,
                                                        country: city.country,
                                                        count: city.count
                                                    })
                                                }
                                                onMouseMove={e =>
                                                    setTooltip(t => (t ? { ...t, x: e.clientX, y: e.clientY } : t))
                                                }
                                                onMouseLeave={() => setTooltip(null)}
                                            >
                                                {/* Invisible/near-invisible larger hit area for easy clicking */}
                                                <circle r={r + 12} fill="rgba(15,23,42,0.01)" stroke="none" />

                                                {/* Soft outer ring */}
                                                <circle r={r + 5} fill="rgba(15,23,42,0.08)" />

                                                {/* Main marker */}
                                                <circle
                                                    r={r}
                                                    fill={color}
                                                    fillOpacity={0.9}
                                                    stroke={isSelected ? '#0f172a' : '#fff'}
                                                    strokeWidth={isSelected ? 2.5 : 1.5}
                                                />

                                                {/* Count label */}
                                                <text
                                                    y={4}
                                                    textAnchor="middle"
                                                    style={{
                                                        fill: 'white',
                                                        fontSize: Math.max(10, Math.min(14, r * 0.55)),
                                                        fontWeight: 700,
                                                        pointerEvents: 'none',
                                                        userSelect: 'none'
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

                {/* Optional quick city list */}
                <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                    <h3 className="text-sm font-semibold text-slate-900">Top cities (filtered)</h3>
                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {cityGroups.slice(0, 12).map(city => (
                            <button
                                key={city.key}
                                onClick={() => {
                                    setSelectedCityKey(city.key);
                                    focusCity(city);
                                    setIsPopupOpen(true);
                                }}
                                className={`rounded-2xl border p-3 text-left transition ${
                                    selectedCity?.key === city.key
                                        ? 'border-slate-900 bg-slate-900 text-white'
                                        : 'border-slate-200 bg-white hover:bg-slate-50'
                                }`}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <div className="min-w-0">
                                        <div className="truncate text-sm font-semibold">{city.city}</div>
                                        <div
                                            className={`truncate text-xs ${
                                                selectedCity?.key === city.key ? 'text-slate-300' : 'text-slate-500'
                                            }`}
                                        >
                                            {city.country}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span
                                            className="inline-block h-3 w-3 rounded-full"
                                            style={{
                                                background: STATUS_COLORS[city.dominantStatus] || STATUS_COLORS.Unknown
                                            }}
                                        />
                                        <span className="text-sm font-semibold">{city.count}</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
