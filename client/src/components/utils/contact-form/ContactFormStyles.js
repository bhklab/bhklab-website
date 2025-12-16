import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import colors from '../../../styles/colors';

const StyledPIInfo = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: left;
	height: 80px;
	line-height: 20px;
	margin-left: 5px;
	margin-bottom: 10px;
	font-size: 16px;
	font-weight: normal;
	text-align: left;

	.pi-name {
		font-weight: 700;
	}

	.pi-position {
		font-size: 15px;
		color: ${colors.dark_gray};
		@media only screen and (max-width: 550px) {
			font-size: 11px;
		}
	}

	@media only screen and (max-width: 550px) {
		height: 100px;
	}
`;

function MarginBar() {
	return <Box sx={{ height: 20 }} />;
}

export { StyledPIInfo, MarginBar };
