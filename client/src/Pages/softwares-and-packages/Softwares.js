/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import 'animate.css/animate.min.css';
import Packages from './Packages';
import WebApplications from './WebApplications';
import { SoftwareAndPackageStyles } from './SoftwaresAndPackagesStyles';

function Software() {
	return (
		<SoftwareAndPackageStyles>
			<WebApplications />
			<hr />
			<Packages />
		</SoftwareAndPackageStyles>
	);
}

export default Software;
