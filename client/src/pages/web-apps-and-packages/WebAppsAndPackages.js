/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import 'animate.css/animate.min.css';
import Packages from './Packages';
import WebApps from './WebApps';
import { WebAppsAndPackagesStyles } from './WebAppsAndPackagesStyles';

function Software() {
	return (
		<WebAppsAndPackagesStyles>
			<WebApps />
			<hr />
			<Packages />
		</WebAppsAndPackagesStyles>
	);
}

export default Software;
