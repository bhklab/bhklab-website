/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import StyledPaginate from './StyledPaginate';

/* ** Commented out code is for pagination if needed again ** */

function Items({ currentItems }) {
	return (
		currentItems &&
		currentItems.map((item) => (
			// eslint-disable-next-line no-underscore-dangle
			<div key={item.props.publication.title}>{item}</div>
		))
	);
}

function PaginatedPublications({ customizedContent, publications, itemsPerPage }) {
	const [currentItems, setCurrentItems] = useState(null);
	const [itemOffset] = useState(0);

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(publications.map((item, index) => customizedContent(item, index)).slice(itemOffset, endOffset));
		// setPageCount(Math.ceil(publications.length / itemsPerPage));
	}, [itemsPerPage, publications]);

	return (
		<StyledPaginate>
			<Items currentItems={currentItems} />
		</StyledPaginate>
	);
}

export default PaginatedPublications;
