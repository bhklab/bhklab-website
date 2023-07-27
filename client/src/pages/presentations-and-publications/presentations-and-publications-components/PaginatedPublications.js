/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
// import ReactPaginate from 'react-paginate';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StyledPaginate from './StyledPaginate';

/* ** Commented out code is for pagination if needed again ** */

function Items({ currentItems }) {
	return (
		currentItems && currentItems.map((item) => (
			// eslint-disable-next-line no-underscore-dangle
			<div key={item.props.publication.title}>
				{item}
			</div>
		))
	);
}

function PaginatedPublications({ customizedContent, publications, itemsPerPage }) {
	const [currentItems, setCurrentItems] = useState(null);
	// const [pageCount, setPageCount] = useState(0);
	const [itemOffset] = useState(0);

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(
			publications
				.map((item, index) => (customizedContent(item, index))).slice(itemOffset, endOffset),
		);
		// setPageCount(Math.ceil(publications.length / itemsPerPage));
	}, [itemsPerPage, publications]);

	// const handlePageClick = (event) => {
	// 	const newOffset = (event.selected * itemsPerPage) % publications.length;
	// 	setItemOffset(newOffset);
	// };

	return (
		<StyledPaginate>
			<Items currentItems={currentItems} />
			{/* <div className="pagination-container">
				<ReactPaginate
					pageCount={pageCount}
					onPageChange={handlePageClick}
					previousLabel={<ArrowBackIosIcon fontSize="20" />}
					nextLabel={<ArrowForwardIosIcon fontSize="20" />}
					containerClassName="paginationBttns"
					previousLinkClassName="previousBttn"
					nextLinkClassName="nextBttn"
					disabledClassName="paginationDisabled"
					activeClassName="paginationActive"
					breakLabel="..."
					pageRangeDisplayed={5}
					renderOnZeroPageCount={null}
				/>
			</div> */}
		</StyledPaginate>
	);
}

export default PaginatedPublications;
