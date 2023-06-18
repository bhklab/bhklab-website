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
	justify-content: center;
	align-items: center;
	width: 100%;

	hr {
		margin-bottom: 50px;
	}
`;

function Software() {
	return (
		<StyledContainer>
			<WebApplications />
			<hr />
			<Packages />
		</StyledContainer>
	);
}

export default Software;
