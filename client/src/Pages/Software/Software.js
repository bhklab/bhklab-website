/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import 'animate.css/animate.min.css';
import styled from 'styled-components';
import Packages from './Packages';
import WebApplications from './WebApplications';

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 50px;

	@media screen and (min-width: 1900px) {
		margin: 0 150px;
	}

	@media screen and (min-width: 2200px) {
		margin: 0 200px;
	}
`;

function Software() {
	return (
		<StyledContainer>
			<WebApplications />
			<Packages />
		</StyledContainer>
	);
}

export default Software;
