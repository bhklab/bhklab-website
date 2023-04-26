import React, {useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import {StyledPaginate} from '../../../styles/StyledPaginate';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Items({ currentItems}) {
	return (
		<>
			{currentItems && currentItems.map((item, index) => (
				<div key={index}>
					{item}
				</div>
			))}
		</>
	);
}


function PaginatedPublications({ customizedContent, publications, itemsPerPage }) {
	const [currentItems, setCurrentItems] = useState(null);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(publications.sort((a, b) => new Date(b.date) - new Date(a.date)).map((item, index) => (
			customizedContent( item, index))).slice(itemOffset, endOffset));
		setPageCount(Math.ceil(publications.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, publications]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % publications.length;
		setItemOffset(newOffset);
	};

	return (
		<StyledPaginate>
			<Items currentItems={currentItems} />
			<ReactPaginate
				pageCount={pageCount}
				onPageChange={handlePageClick}
				previousLabel={<ArrowBackIosIcon fontSize="20"/>}
				nextLabel={<ArrowForwardIosIcon fontSize="20"/>}
				containerClassName={'paginationBttns'}
				previousLinkClassName={'previousBttn'}
				nextLinkClassName={'nextBttn'}
				disabledClassName={'paginationDisabled'}
				activeClassName={'paginationActive'}
				breakLabel="..."
				pageRangeDisplayed={5}
				renderOnZeroPageCount={null}
			/>
		</StyledPaginate>
	);
}

export {
	PaginatedPublications
};
