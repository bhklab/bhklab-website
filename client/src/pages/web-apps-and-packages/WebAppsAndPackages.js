/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import 'animate.css/animate.min.css';
import Packages from './Packages';
import WebApps from './WebApps';
import { WebAppsAndPackagesContainerStyles } from './WebAppsAndPackagesStyles';

function Software() {
	return (
		<WebAppsAndPackagesContainerStyles className="webapps-packages-container">
			<WebApps />
			<hr />
			<Packages />
		</WebAppsAndPackagesContainerStyles>
	);
}

export default Software;
