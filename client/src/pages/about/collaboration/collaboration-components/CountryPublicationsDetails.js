/* eslint-disable react/prop-types */
// src/components/.../collaboration-components/CountryPublicationsDetails.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Paginator } from 'primereact/paginator';
import StyledPaginate from './StyledPaginate';
import { StyledCard, StyledAuthors, StyledTitle, StyledEvent, StyledLocation, StyledDate } from './CardStyles';

import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const PLACEHOLDER_IMAGE = 'https://storage.googleapis.com/caboodle-images/publication/publication-blurry.png';

function formatDate(date) {
	if (!date) return '';
	const s = String(date);
	// Matches your previous style: date.slice(0, -14) when date is ISO with time
	// Example: 2017-05-18T00:00:00.000+00:00 -> 2017-05-18
	if (s.length >= 10) return s.slice(0, 10);
	return s;
}

function PublicationCard({ publication, countryName }) {
	const { image, title, url, authors, date, publisher, doi, collaborators, year } = publication;
	console.log(title);

	const cover = image ? `https://storage.googleapis.com/caboodle-images/publication/${image}` : PLACEHOLDER_IMAGE;

	const coreCollabs = Array.isArray(collaborators) && collaborators.length ? collaborators.join(', ') : 'N/A';

	return (
		<StyledCard
			sx={{
				display: 'flex',
				margin: '15px 0 0 0',
				padding: 0,
			}}
		>
			<div style={{ width: 125, height: 125, flex: '0 0 auto' }}>
				{url ? (
					<a className="link" href={url} target="_blank" rel="noreferrer">
						<CardMedia
							component="img"
							sx={{ width: 125, height: 125, objectFit: 'cover' }}
							image={cover}
							alt={image ? "an image of publisher's cover" : 'a placeholder image for unavailable publisher cover'}
						/>
					</a>
				) : (
					<CardMedia
						component="img"
						sx={{ width: 125, height: 125, objectFit: 'cover' }}
						image={cover}
						alt={image ? "an image of publisher's cover" : 'a placeholder image for unavailable publisher cover'}
					/>
				)}
			</div>

			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1px',
					padding: '6px',
					width: '100%',
					minWidth: 0,
				}}
			>
				<StyledTitle style={{ display: 'flex', gap: 8, alignItems: 'center', minWidth: 0 }}>
					{url ? (
						<a className="link" href={url} target="_blank" rel="noreferrer" style={{ minWidth: 0 }}>
							{title || 'Untitled publication'}
						</a>
					) : (
						<span>{title || 'Untitled publication'}</span>
					)}

					{doi && (
						<a
							href={`https://www.pmscience.ca/publication/${encodeURIComponent(doi)}`}
							target="_blank"
							rel="noreferrer"
							style={{ flex: '0 0 auto' }}
						>
							<img src="/images/logo/science-portal-logo.svg" alt="science portal" style={{ width: 20, height: 20 }} />
						</a>
					)}
				</StyledTitle>

				<StyledEvent>
					{publisher && <div>{publisher}</div>}
					{/* Keep year visible even if publisher missing */}
					{!publisher && year != null && <div>{year}</div>}
				</StyledEvent>

				{authors && <StyledAuthors>{authors}</StyledAuthors>}

				{/* ✅ Core Collaborations (country-specific credits) */}
				<StyledLocation>
					<b>{`Core Collaborations (${countryName})`}</b>: {coreCollabs}
				</StyledLocation>

				{date && <StyledDate>{formatDate(date)}</StyledDate>}
			</div>
		</StyledCard>
	);
}

function Items({ currentItems, countryName }) {
	return (
		currentItems &&
		currentItems.map((p) => (
			<PublicationCard
				// unique per country (you built id as `${pub._id}-${countryKey}`)
				key={p.id}
				publication={p}
				countryName={countryName}
			/>
		))
	);
}

export default function CountryPublicationsDetails({ selectedCountry, itemsPerPage = 5 }) {
	const topRef = useRef(null);

	// Raw publications for the selected country
	const pubs = useMemo(() => selectedCountry?.publications || [], [selectedCountry]);
	const countryKey = selectedCountry?.key || 'none';
	const countryName = selectedCountry?.country || 'Selected country';

	// ✅ Sort publications by year (desc), then title (asc)
	const sortedPubs = useMemo(() => {
		const arr = Array.isArray(pubs) ? pubs.slice() : [];
		arr.sort((a, b) => {
			const ay = Number.isFinite(Number(a?.year)) ? Number(a.year) : -Infinity;
			const by = Number.isFinite(Number(b?.year)) ? Number(b.year) : -Infinity;
			if (by !== ay) return by - ay;
			return String(a?.title || '').localeCompare(String(b?.title || ''));
		});
		return arr;
	}, [pubs]);

	// PrimeReact paginator state: "first" = index of the first record on current page
	const [first, setFirst] = useState(0);

	const prevKey = useRef(countryKey);

	// Reset paginator when country changes
	useEffect(() => {
		if (prevKey.current !== countryKey) {
			prevKey.current = countryKey;
			setFirst(0);
			requestAnimationFrame(() => {
				topRef.current?.scrollIntoView({ behavior: 'smooth' });
			});
		}
	}, [countryKey]);

	// If list changes and current page is out of range, clamp back to 0
	useEffect(() => {
		if (first >= sortedPubs.length && sortedPubs.length > 0) setFirst(0);
	}, [sortedPubs.length, first]);

	const currentItems = useMemo(() => {
		const end = first + itemsPerPage;
		return sortedPubs.slice(first, end);
	}, [sortedPubs, first, itemsPerPage]);

	const handlePageChange = (e) => {
		setFirst(e.first);
	};

	const showPaginator = sortedPubs.length > itemsPerPage;

	return (
		<StyledPaginate>
			<div ref={topRef} style={{ scrollMarginTop: 90 }} />

			{/* Header */}
			<div style={{ marginBottom: 12 }}>
				<Typography variant="h6">{selectedCountry ? countryName : 'Select a country'}</Typography>
				<Typography variant="body2" color="text.secondary">
					{selectedCountry
						? `${sortedPubs.length} publication${sortedPubs.length === 1 ? '' : 's'}`
						: 'Click a highlighted country on the map to load publications.'}
				</Typography>
			</div>

			<div
				style={{
					display: 'grid',
					gap: 12,
					gridAutoRows: 'max-content',
					alignContent: 'start',
					alignItems: 'start',
				}}
			>
				<Items currentItems={currentItems} countryName={countryName} />
			</div>

			{/* PrimeReact pagination */}
			<div className="pagination-container">
				{showPaginator && (
					<Paginator
						first={first}
						rows={itemsPerPage}
						totalRecords={sortedPubs.length}
						onPageChange={handlePageChange}
						template="PrevPageLink PageLinks NextPageLink"
					/>
				)}
			</div>
		</StyledPaginate>
	);
}
