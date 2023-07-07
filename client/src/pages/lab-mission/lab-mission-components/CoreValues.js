import React from 'react';
import { StyledValues } from '../LabMissionStyles';

const coreValuesList = {
	'Open Science': 'Research transparency, reproducibility, and reusability',
	Accessible: 'Science must be accessible and beneficial to everyone',
	Multidisciplinary: 'Our research is fundamentally multidisciplinary and all expertise is valued',
	Unknown2:
	<>
		Recognition and valorization of diverse contributions
		<a
			href="https://sfdora.org/"
			target="_blank"
			rel="noreferrer"
		>
			{' '}
			Declaration on Research Assessment principles
			{' '}
		</a>
	</>,
};

/**
 *
 * @param {Object} values
 * @returns {React.JSX}
 */
const displayCoreValues = (values) => Object.entries(values).map(([key, value]) => (
	<div className="core-values-single-list-item">
		<img
			src="/images/Logo/customer.png"
			alt="artifical-intelligence"
		/>
		<h4>
			{key}
		</h4>
		<p>
			{value}
		</p>

	</div>
));

/**
 *
 * @returns {React.JSX}
 */
function CoreValues() {
	return (
		<StyledValues>
			<h2 className="core-values-heading">
				Core Values
			</h2>
			<p className="core-values-list">
				{displayCoreValues(coreValuesList)}
			</p>
		</StyledValues>
	);
}

export default CoreValues;
