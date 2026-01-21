/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import StyledPaginate from './StyledPaginate';

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
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const prevPublications = useRef();

	useEffect(() => {
		if (prevPublications.current !== publications) {
			prevPublications.current = publications;
			setItemOffset(0);
			setCurrentPage(0);
		}
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(publications.map((item, index) => customizedContent(item, index)).slice(itemOffset, endOffset));
		setPageCount(Math.ceil(publications.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, publications]);

	const handlePageClick = (event) => {
		const selectedPage = event.selected;
		setCurrentPage(selectedPage);
		const newOffset = (selectedPage * itemsPerPage) % publications.length;
		setItemOffset(newOffset);
	};

	return (
		<StyledPaginate>
			<Items currentItems={currentItems} />
			<div className="pagination-container">
				<ReactPaginate
					breakLabel="..."
					nextLabel="next >"
					onPageChange={handlePageClick}
					pageRangeDisplayed={5}
					pageCount={pageCount}
					previousLabel="< previous"
					renderOnZeroPageCount={null}
					containerClassName="paginationBttns"
					pageLinkClassName=""
					previousLinkClassName=""
					nextLinkClassName=""
					activeLinkClassName=""
					disabledLinkClassName="paginationDisabled"
					activeClassName="paginationActive"
					breakLinkClassName=""
					forcePage={currentPage}
				/>
			</div>
		</StyledPaginate>
	);
}

export default PaginatedPublications;
