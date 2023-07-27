import React from 'react';
import { WebAppsAndPackagesStyles } from './WebAppsAndPackagesStyles';
import getRandomElementsFromArray from '../../utils/getRandomElementsFromArray';

const WEBAPPLICATION_DISPLAY_COUNT = 6;

const imgDirectory = 'images/software/';

const listWebApps = [
	{
		applicationName: 'Orcestra',
		imgSrc: `${imgDirectory}orcestra.png`,
		imgAltAttribute: 'orcestra',
		appURL: 'https://www.orcestra.ca/',
		githubURL: 'https://github.com/bhklab/ORCESTRA',
		appDescription: 'Orchestrate and reproduce pharmacogenomic data processing',
	},
	{
		applicationName: 'Drug Network Fusion (DNF)',
		imgSrc: `${imgDirectory}dnf-logo.png`,
		imgAltAttribute: 'drug network fusion(dnf)',
		appURL: 'http://drugnetworkfusion.ca/',
		githubURL: 'https://github.com/bhklab/DNF-webapp',
		appDescription: 'Explore multi-layer similarities between chemical compounds',
	},
	{
		applicationName: 'ToxicoDB',
		imgSrc: `${imgDirectory}toxicodb-logo.png`,
		imgAltAttribute: 'toxicodb',
		appURL: 'https://www.toxicodb.ca/',
		githubURL: 'https://github.com/bhklab/ToxicoDB',
		appDescription: 'Investigate the pathways triggered by exposure to toxic substances',
	},
	{
		applicationName: 'XevaDB',
		imgSrc: `${imgDirectory}xevadb-logo.png`,
		imgAltAttribute: 'xevadb',
		appURL: 'https://xevadb.ca/',
		githubURL: 'https://github.com/bhklab/XevaDB',
		appDescription: 'Visualize and analyze xenographic pharmacogenomic data',
	},
	{
		applicationName: 'PharmacoDB',
		imgSrc: `${imgDirectory}pharmacodb-logo-new-dark.png`,
		imgAltAttribute: 'pharmacodb',
		appURL: 'https://pharmacodb.ca/',
		githubURL: 'https://github.com/bhklab/ORCESTRA',
		appDescription: 'Mine pharmacogenomic profiles of cancer cell lines treated with single agent',
	},
	{
		applicationName: 'SynergxDB',
		imgSrc: `${imgDirectory}synergx-logo.png`,
		imgAltAttribute: 'synergxdb',
		appURL: 'https://www.synergxdb.ca/',
		githubURL: 'https://github.com/bhklab/PharmacoDB-JS',
		appDescription: 'Explore synergistic drug combinations in cancer cell lines',
	},
	{
		applicationName: 'CCLid',
		imgSrc: `${imgDirectory}cclid-logo.png`,
		imgAltAttribute: 'cclid',
		appURL: 'https://cclid.ca/',
		githubURL: 'https://github.com/bhklab/CCL_webapp',
		appDescription: 'Authenticate genotype and stability of cancer cell lines',
	},
	{
		applicationName: 'Quannotate',
		imgSrc: `${imgDirectory}quannotate-logo.png`,
		imgAltAttribute: 'quannotate',
		appURL: 'https://www.quannotate.com/',
		githubURL: 'https://github.com/bhklab/QUANNOTATE-web',
		appDescription: 'Check quality-assurance for radiotherapy target delineation',
	},
	{
		applicationName: 'KulGap',
		imgSrc: `${imgDirectory}kulgap-logo.png`,
		imgAltAttribute: 'kulgap',
		appURL: 'https://www.kulgap.ca/',
		githubURL: 'https://github.com/bhklab/KuLGaP',
		appDescription: 'Quantify therapy response to drug treatment in xenografts',
	},
	{
		applicationName: 'PredictIO',
		imgSrc: `${imgDirectory}predictio-logo.png`,
		imgAltAttribute: 'predictio',
		appURL: 'https://predictio.ca/',
		githubURL: 'https://github.com/bhklab/PredictIO-webapp',
		appDescription: 'Investigate predictive and prognostic values of genes. Predict patient response to ICB therapy',
	},
];

const subsetOfWebApps = getRandomElementsFromArray(
	listWebApps,
	WEBAPPLICATION_DISPLAY_COUNT,
);

function WebApps() {
	return (
		<WebAppsAndPackagesStyles>
			<div className="component-heading-web-apps">
				<h1>
					Web-applications
				</h1>
			</div>
			<div className="web-apps-container">
				{
					subsetOfWebApps.map((application) => (
						<div className="single-app-container">
							<div className="app-section">
								<div className="app-section-link">
									<a
										target="_blank"
										href={application.appURL}
										rel="noreferrer"
									>
										<img
											className="logo"
											src={application.imgSrc}
											alt={application.imgAltAttribute}
										/>
									</a>
								</div>
								<div className="app-section-description">
									{application.appDescription}
									<div className="app-section-description-github">
										<a
											target="_blank"
											href={application.githubURL}
											rel="noreferrer"
										>
											<img
												src="images/social-media/github.png"
												alt="github-link"
											/>
										</a>
									</div>
								</div>
							</div>
						</div>
					))
				}
			</div>
		</WebAppsAndPackagesStyles>
	);
}

export default WebApps;
