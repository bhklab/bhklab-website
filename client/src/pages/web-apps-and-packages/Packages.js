import React from 'react';
import { WebAppsAndPackagesStyles } from './WebAppsAndPackagesStyles';
import getRandomElementsFromArray from '../../utils/getRandomElementsFromArray';

const PACKAGE_DISPLAY_COUNT = 6;

const packageList = [
	// Bioconductor/Github packages first
	{
		title: 'CoreGx',
		link: 'https://bioconductor.org/packages/release/bioc/html/CoreGx.html',
		image: './images/software/R-logo.png',
		description: 'Classes and Functions to Serve as the Basis for Other \'Gx\' Packages',
	},
	{
		title: 'PharmacoGx',
		link: 'http://www.bioconductor.org/packages/release/bioc/html/PharmacoGx.html',
		image: './images/software/R-logo.png',
		description: 'Analysis of Large-Scale Pharmacogenomic Data',
	},
	{
		title: 'RadioGx',
		link: 'https://cran.r-project.org/web/packages/RadioGx/index.html',
		image: './images/software/R-logo.png',
		description: 'Analysis of Large-Scale Radio-Genomic Data',
	},
	{
		title: 'ToxicoGx',
		link: 'https://bioconductor.org/packages/3.12/bioc/html/ToxicoGx.html',
		image: './images/software/R-logo.png',
		description: 'Analysis of Large-Scale Toxico-Genomic Data',
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
		description: 'Analysis of patient-derived xenograph (PDX) data',
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
		description: 'Performance Assessment and Comparison for Survival Analysis',
	},
	{
		title: 'consensusOV',
		link: 'http://www.pmgenomics.ca/bhklab/software/consensusOV',
		image: './images/software/R-logo.png',
		description: 'Gene expression-based subtype classification for high-grade serous ovarian cancer',
	},
	// PyPI/Python packages after
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
		description: 'Functions for statistical analysis of treatment response curves in patient derived xenograph (PDX) models of cancer',
	},
	{
		title: 'readii',
		link: 'https://pypi.org/project/readii/',
		image: './images/software/python-logo.png',
		description: 'A package to extract radiomic features!',
	},
	{
		title: 'med-imagetools',
		link: 'https://pypi.org/project/med-imagetools/',
		image: './images/software/python-logo.png',
		description: 'Transparent and Reproducible Medical Image Processing Pipelines in Python',
	},
	{
		title: 'orcestra-downloader',
		link: 'https://pypi.org/project/orcestra-downloader/',
		image: './images/software/python-logo.png',
		description: 'Simplified access to download data from orcestra.ca',
	},
	{
		title: 'pyradiomics-bhklab',
		link: 'https://pypi.org/project/pyradiomics-bhklab/',
		image: './images/software/python-logo.png',
		description: 'Radiomics features library for python',
	},
	{
		title: 'yarea',
		link: 'https://pypi.org/project/yarea/',
		image: './images/software/python-logo.png',
		description: 'A package to extract radiomic features!',
	},
	{
		title: 'cinet',
		link: 'https://pypi.org/project/cinet/',
		image: './images/software/python-logo.png',
		description: 'Scikit-Learn interface for CINET PyTorch siamese neural network',
	},
	{
		title: 'PharmacoDI',
		link: 'https://pypi.org/project/PharmacoDI/',
		image: './images/software/python-logo.png',
		description: 'Tools for processing R PharmacoSet objects into .csv files of PharmacoDB database tables',
	},
	{
		title: 'pymrmre',
		link: 'https://pypi.org/project/pymrmre/',
		image: './images/software/python-logo.png',
		description: 'A Python package for Parallelized Minimum Redundancy, Maximum Relevance (mRMR) Ensemble Feature selections',
	},
];

const subsetPackageList = getRandomElementsFromArray(packageList, PACKAGE_DISPLAY_COUNT);

function Packages() {
	return (
		<WebAppsAndPackagesStyles>
			<div className="component-heading-packages">
				<h1>
					Software Packages
				</h1>
			</div>
			<div className="packages-container">
				{
					subsetPackageList.map((pkg) => (
						<div className="single-package-container" key={pkg.title}>
							<div className="package-section">
								<div className="package-section-link-image">
									<a
										target="_blank"
										href={pkg.link}
										className="package-title"
										rel="noreferrer"
									>
										{pkg.title}
									</a>
									<img
										className="package-language-image"
										src={pkg.image}
										title="Package Logo"
										alt="Package Logo"
									/>
								</div>
								<div className="package-section-description">
									{pkg.description}
								</div>
							</div>

						</div>
					))
				}
			</div>
		</WebAppsAndPackagesStyles>
	);
}

export default Packages;
