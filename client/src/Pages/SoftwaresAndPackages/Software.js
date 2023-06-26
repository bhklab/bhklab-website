/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import 'animate.css/animate.min.css';
import Packages from './Packages';
import WebApplications from './WebApplications';
import { StyledContainer } from './StyledSoftwaresAndPackages';

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
