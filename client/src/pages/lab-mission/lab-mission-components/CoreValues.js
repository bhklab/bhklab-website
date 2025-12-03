import React from 'react';
import { StyledCoreValues } from '../LabMissionStyles';

const coreValuesList = {
	Openness: {
		image: '/images/logo/customer.png',
		description: 'Research transparency, reproducibility, and reusability',
		altAttribute: 'reproducibility',
	},
	Accessibility: {
		image: '/images/logo/accessibility.png',
		description: 'Science must be accessible and beneficial to everyone',
		altAttribute: 'accessibility',
	},
	Multidisciplinarity: {
		image: '/images/logo/multidisciplinarity.png',
		description: 'Our research is fundamentally multidisciplinary and all expertise is valued',
		altAttribute: 'multi-disciplinarity',
	},
	Diversity: {
		image: '/images/logo/diversity-values.png',
		description: (
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
			</>
		),
		altAttribute: 'diversity',
	},
};

/**
 *
 * @param {Object} values
 * @returns {React.JSX}
 */
const displayCoreValues = (values) => Object.entries(values).map(([key, value]) => (
	<div className="core-values-single-list-item" key={key}>
		<img
			src={value.image}
			alt={value.altAttribute}
		/>
		<h4>
			{key}
		</h4>
		<p>
			{value.description}
		</p>
	</div>
));

/**
 *
 * @returns {React.JSX}
 */
function CoreValues() {
	return (
		<StyledCoreValues>
			<h1>
				Core Values
			</h1>
			<div className="core-values-list">
				{displayCoreValues(coreValuesList)}
			</div>
		</StyledCoreValues>
	);
}

export default CoreValues;
