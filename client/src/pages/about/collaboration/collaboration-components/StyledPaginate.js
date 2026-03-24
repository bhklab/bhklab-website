import colors from '../../../../styles/colors';
import styled from 'styled-components';

const StyledPaginate = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 0;
	width: 100%;
	max-width: 900px;

	/* ✅ let it grow as tall as it needs */
	height: auto;
	min-height: 0;
	overflow: visible;

	/* Pagination naturally sits under content */
	.pagination-container {
		margin-top: 20px;
	}

	@media screen and (max-width: 650px) {
		& .MuiCardContent-root {
			padding: 4px 0 0 4px !important;
		}
	}

	.paginationBttns {
		height: 20px;
		list-style: none;
		display: flex;
		justify-content: center;
		font-size: 0.9rem;
	}

	.paginationBttns a {
		padding: 5px;
		margin: 7.5px;
		border-radius: 5px;
		color: ${colors.link_color};
		cursor: pointer;
	}

	.paginationBttns a:hover {
		color: ${colors.white_color};
		background-color: ${colors.link_color};
	}

	.paginationActive a {
		border-radius: 7px;
		border: 2px solid ${colors.link_color};
		color: ${colors.link_color};
	}

	.paginationDisabled a {
		visibility: hidden;
		background-color: ${colors.white_color};
	}
`;

export default StyledPaginate;
