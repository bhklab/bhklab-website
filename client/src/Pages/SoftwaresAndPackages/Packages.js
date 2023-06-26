import React from 'react';
import { StyledSoftware } from './StyledSoftwaresAndPackages';
import getRandomElementsFromArray from '../../utils/getRandomElementsFromArray';

const PACKAGE_DISPLAY_COUNT = 4;

const packageList = [
	{
		title: 'CoreGx',
		link: 'https://bioconductor.org/packages/release/bioc/html/CoreGx.html',
		image: './images/software/R-logo.png',
		description: 'Core infrastructure which serves as the foundation for other Gx packages',
	},
	{
		title: 'PharmacoGx',
		link: 'http://www.bioconductor.org/packages/release/bioc/html/PharmacoGx.html',
		image: './images/software/R-logo.png',
		description: 'Analysis of large-scale pharmacogenomic datasets',
	},
	{
		title: 'RadioGx',
		link: 'https://cran.r-project.org/web/packages/RadioGx/index.html',
		image: './images/software/R-logo.png',
		description: 'Biomarker discovery for Radiation Treatment using in vitro models',
	},
	{
		title: 'ToxicoGx',
		link: 'https://bioconductor.org/packages/3.12/bioc/html/ToxicoGx.html',
		image: './images/software/R-logo.png',
		description: 'Analysis of large-scale toxicogenomic datasets',
	},
	{
		title: 'CREAM',
		link: 'https://cran.r-project.org/web/packages/CREAM/index.html',
		image: './images/software/R-logo.png',
		description: 'Clustering of Genomic Regions Analysis Method',
	},
	{
		title: 'mRMRe',
		link: 'https://cran.r-project.org/web/packages/mRMRe/index.html',
		image: './images/software/R-logo.png',
		description: 'Parallelized minimum Redundancy, maximum Relevance ensemble feature selection',
	},
	{
		title: 'SIGN',
		link: 'https://cran.r-project.org/web/packages/SIGN/index.html',
		image: './images/software/R-logo.png',
		description: 'Similarity Identification in Gene Expression',
	},
	{
		title: 'RLOBICO',
		link: 'https://github.com/bhklab/RLOBICO',
		image: './images/software/R-logo.png',
		description: 'R implementation of Logic Optimization for Binary Input to Continuous Output',
	},
	{
		title: 'Xeva',
		link: 'http://bioconductor.org/packages/release/bioc/html/Xeva.html',
		image: './images/software/R-logo.png',
		description: 'Xenograft Visualization and Analysis',
	},
	{
		title: 'PDATK',
		link: 'https://bioconductor.org/packages/devel/bioc/html/PDATK.html',
		image: './images/software/R-logo.png',
		description: 'Pancreatic Ductal Adenocarcinoma Tool-Kit',
	},
	{
		title: 'genefu',
		link: 'https://bioconductor.org/packages/release/bioc/html/genefu.html',
		image: './images/software/R-logo.png',
		description: 'Computation of Gene Expression-Based Signatures in Breast Cancer',
	},
	{
		title: 'survcomp',
		link: 'https://www.bioconductor.org/packages/release/bioc/html/survcomp.html',
		image: './images/software/R-logo.png',
		description: 'Assessment and Comparison for Performance of Risk Prediction (Survival) Models',
	},
	{
		title: 'PymRMRe',
		link: 'https://pypi.org/project/pymrmr/',
		image: './images/software/python-logo.png',
		description: 'Parallelized minimum Redundancy, maximum Relevance ensemble feature selection',
	},
	{
		title: 'pyKuLGaP',
		link: 'https://pypi.org/project/pykulgap/',
		image: './images/software/python-logo.png',
		description: 'Modelling tumor growth curves using KuLLback-Leibler divergence and Gaussian processes',
	},
];

const subsetPackageList = getRandomElementsFromArray(packageList, PACKAGE_DISPLAY_COUNT);

function Packages() {
	return (
		<StyledSoftware>
			<div className="component-heading">
				<h1>
					Packages
				</h1>
			</div>
			<div className="packages-container">
				{
					subsetPackageList.map((pkg) => (
						<div className="single-package-container" key={pkg.title}>
							<div className="package-section">
								<a target="_blank" href={pkg.link} className="package-title" rel="noreferrer">
									{pkg.title}
								</a>
								<img className="lang" src={pkg.image} title="Package Logo" alt="Package Logo" />
							</div>
							<div className="description-section">{pkg.description}</div>
						</div>
					))
				}
			</div>
		</StyledSoftware>
	);
}

export default Packages;
