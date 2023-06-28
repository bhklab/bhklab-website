import React from 'react';
import { SoftwareAndPackageStyles } from './WebAppsAndPackagesStyles';
import getRandomElementsFromArray from '../../utils/getRandomElementsFromArray';

const WEBAPPLICATION_DISPLAY_COUNT = 6;

const imgDirectory = 'images/software/';

const webApplications = [
	{
		applicationName: 'Orcestra',
		imgSrc: `${imgDirectory}orcestra.png`,
		imgAltAttribute: 'orcestra',
		appURL: 'https://www.orcestra.ca/',
		appDescription: 'Orchestrate and reproduce pharmacogenomic data processing',
	},
	{
		applicationName: 'Drug Network Fusion (DNF)',
		imgSrc: `${imgDirectory}dnf-logo.png`,
		imgAltAttribute: 'drug network fusion(dnf)',
		appURL: 'http://drugnetworkfusion.ca/',
		appDescription: 'Explore multi-layer similarities between chemical compounds',
	},
	{
		applicationName: 'ToxicoDB',
		imgSrc: `${imgDirectory}toxicodb-logo.png`,
		imgAltAttribute: 'toxicodb',
		appURL: 'https://www.toxicodb.ca/',
		appDescription: 'Investigate the pathways triggered by exposure to toxic substances',
	},
	{
		applicationName: 'XevaDB',
		imgSrc: `${imgDirectory}xevadb-logo.png`,
		imgAltAttribute: 'xevadb',
		appURL: 'https://xevadb.ca/',
		appDescription: 'Visualize and analyze xenographic pharmacogenomic data',
	},
	{
		applicationName: 'PharmacoDB',
		imgSrc: `${imgDirectory}pharmacodb-logo-new.png`,
		imgAltAttribute: 'pharmacodb',
		appURL: 'https://pharmacodb.ca/',
		appDescription: 'Mine pharmacogenomic profiles of cancer cell lines treated with single agent',
	},
	{
		applicationName: 'SynergxDB',
		imgSrc: `${imgDirectory}synergx-logo.png`,
		imgAltAttribute: 'synergxdb',
		appURL: 'https://www.synergxdb.ca/',
		appDescription: 'Explore synergistic drug combinations in cancer cell lines',
	},
	{
		applicationName: 'CCLid',
		imgSrc: `${imgDirectory}cclid-logo.png`,
		imgAltAttribute: 'cclid',
		appURL: 'https://cclid.ca/',
		appDescription: 'Authenticate genotype and stability of cancer cell lines',
	},
	{
		applicationName: 'Quannotate',
		imgSrc: `${imgDirectory}quannotate-logo.png`,
		imgAltAttribute: 'quannotate',
		appURL: 'https://www.quannotate.com/',
		appDescription: 'Check quality-assurance for radiotherapy target delineation',
	},
	{
		applicationName: 'KulGap',
		imgSrc: `${imgDirectory}kulgap-logo.png`,
		imgAltAttribute: 'kulgap',
		appURL: 'https://www.kulgap.ca/',
		appDescription: 'Quantify therapy response to drug treatment in xenografts',
	},
	{
		applicationName: 'PredictIO',
		imgSrc: `${imgDirectory}predictio-logo.png`,
		imgAltAttribute: 'predictio',
		appURL: 'https://predictio.ca/',
		appDescription: 'Investigate predictive and prognostic values of genes. Predict patient response to ICB therapy',
	},
];

const subsetOfWebApplications = getRandomElementsFromArray(
	webApplications,
	WEBAPPLICATION_DISPLAY_COUNT,
);

function WebApplications() {
	return (
		<SoftwareAndPackageStyles>
			<div className="component-heading">
				<h1>
					Softwares
				</h1>
			</div>
			<div className="web-apps-container">
				{
					subsetOfWebApplications.map((application) => (
						<div className="single-app-container">
							<div className="app-section">
								<img
									className="logo"
									src={application.imgSrc}
									alt={application.imgAltAttribute}
								/>
								<a
									target="_blank"
									href="https://predictio.ca/"
									className="link bottom-row"
									rel="noreferrer"
								>
									Go!
								</a>
							</div>
							<div className="description-section">
								{application.appDescription}
							</div>
						</div>
					))
				}
			</div>
		</SoftwareAndPackageStyles>
	);
}

export default WebApplications;
