/* eslint-disable react/prop-types */
// src/components/.../collaboration-components/CityCollaborationsDetails.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import StyledPaginate from './StyledPaginate';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const STATUS_COLORS = {
	Completed: '#10b981',
	Ongoing: '#f59e0b',
	'Not started': '#6366f1',
	Unknown: '#94a3b8',
};

const WRAP_SX = {
	overflowWrap: 'anywhere',
	wordBreak: 'break-word',
	whiteSpace: 'normal',
};

function Field({ label, value }) {
	if (!value) return null;
	return (
		<Typography variant="body2" sx={{ ...WRAP_SX }}>
			<b>{label}:</b> {value}
		</Typography>
	);
}

function CollabCard({ collab }) {
	const statusColor = STATUS_COLORS[collab.status] || STATUS_COLORS.Unknown;

	return (
		<Card
			variant="outlined"
			sx={{
				borderRadius: 2,
				height: 'fit-content',
				alignSelf: 'start',
			}}
		>
			<CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
				<Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap' }}>
					<Chip
						label={collab.status}
						size="small"
						sx={{
							backgroundColor: statusColor,
							color: '#fff',
							fontWeight: 700,
						}}
					/>
					{collab.type && <Chip label={collab.type} size="small" variant="outlined" />}
					{collab.startYear && <Chip label={collab.startYear} size="small" variant="outlined" />}
				</Stack>

				<Typography variant="h6" sx={{ ...WRAP_SX }}>
					{collab.project || 'Untitled project'}
				</Typography>

				<Typography variant="body2" color="text.secondary" sx={{ ...WRAP_SX }}>
					{collab.organization || 'Unknown org'}
				</Typography>

				<Field label="City" value={collab.city} />
				<Field label="Country" value={collab.country} />

				<Field label="Main collaborator" value={collab.mainCollab} />
				<Field label="Other collaborators" value={collab.otherCollabs} />
				<Field label="Contact" value={collab.contact} />
				<Field label="Members" value={collab.members} />
				<Field label="Role" value={collab.role} />
				<Field label="Outputs" value={collab.outputs} />
			</CardContent>
		</Card>
	);
}

function Items({ currentItems }) {
	return currentItems && currentItems.map((c) => <CollabCard key={c.id} collab={c} />);
}

export default function CityCollaborationsDetails({ selectedCity, itemsPerPage = 5 }) {
	const topRef = useRef(null);
	const collabs = useMemo(() => selectedCity?.collaborations || [], [selectedCity]);
	const cityKey = selectedCity?.key || 'none';

	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);

	const prevCityKey = useRef(cityKey);

	useEffect(() => {
		// Reset pagination when city changes
		if (prevCityKey.current !== cityKey) {
			prevCityKey.current = cityKey;
			setItemOffset(0);
			setCurrentPage(0);
		}

		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(collabs.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(collabs.length / itemsPerPage));
	}, [cityKey, collabs, itemOffset, itemsPerPage]);

	const handlePageClick = (event) => {
		const selectedPage = event.selected;
		setCurrentPage(selectedPage);
		const newOffset = (selectedPage * itemsPerPage) % Math.max(collabs.length, 1);
		setItemOffset(newOffset);
		requestAnimationFrame(() => {
			topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	};

	return (
		<StyledPaginate>
			<div ref={topRef} />
			{/* Header */}
			<div style={{ marginBottom: 12 }}>
				<Typography variant="h6">
					{selectedCity ? `${selectedCity.city}, ${selectedCity.country}` : 'Select a city'}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{selectedCity
						? `${collabs.length} collaboration${collabs.length === 1 ? '' : 's'}`
						: 'Click a city marker to load collaborations.'}
				</Typography>
			</div>

			{/* ✅ Auto-height list (no internal scroll). Prevents stretching and cutoffs. */}
			<div
				style={{
					display: 'grid',
					gap: 12,
					gridAutoRows: 'max-content',
					alignContent: 'start',
					alignItems: 'start',
				}}
			>
				<Items currentItems={currentItems} />
			</div>

			{/* Pagination naturally below content */}
			<div className="pagination-container">
				{pageCount > 1 && (
					<ReactPaginate
						breakLabel="..."
						nextLabel="next >"
						onPageChange={handlePageClick}
						pageRangeDisplayed={5}
						pageCount={pageCount}
						previousLabel="< previous"
						renderOnZeroPageCount={null}
						containerClassName="paginationBttns"
						disabledLinkClassName="paginationDisabled"
						activeClassName="paginationActive"
						forcePage={currentPage}
					/>
				)}
			</div>
		</StyledPaginate>
	);
}
