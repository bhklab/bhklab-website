/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
import { Paginator } from 'primereact/paginator';
import StyledPaginate from './StyledPaginate';

function Items({ currentItems }) {
	return (
		currentItems &&
		currentItems.map((item) => (
			// eslint-disable-next-line no-underscore-dangle
			<div key={item.props.publication._id}>{item}</div>
		))
	);
}

function PaginatedPublications({ customizedContent, publications, itemsPerPage }) {
	const [currentItems, setCurrentItems] = useState(null);
	const [itemOffset, setItemOffset] = useState(0);
	const prevPublications = useRef();

	useEffect(() => {
		if (prevPublications.current !== publications) {
			prevPublications.current = publications;
			setItemOffset(0);
		}
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(publications.map((item, index) => customizedContent(item, index)).slice(itemOffset, endOffset));
	}, [itemOffset, itemsPerPage, publications]);

	const handlePageClick = (event) => {
		setItemOffset(event.first);
	};

	return (
		<StyledPaginate>
			<Items currentItems={currentItems} />
			<div className="pagination-container">
				{publications.length > 0 && (
					<Paginator
						first={itemOffset}
						rows={itemsPerPage}
						totalRecords={publications.length}
						onPageChange={handlePageClick}
						template="PrevPageLink CurrentPageReport NextPageLink"
					/>
				)}
			</div>
		</StyledPaginate>
	);
}

export default PaginatedPublications;
