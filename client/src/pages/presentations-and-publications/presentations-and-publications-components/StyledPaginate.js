import styled from 'styled-components';
import colors from '../../../styles/colors';

const StyledPaginate = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	max-width: 900px;
	height: 800px;

	/* Paginator always stays at bottom */
	.pagination-container {
		flex-shrink: 0;
		margin-top: auto;
		padding-top: 20px; /* keeps your existing spacing */
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
