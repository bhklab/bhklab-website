import React from 'react';
import { StyledSection, StyledValues } from '../LabMissionStyles';

const coreValuesList = [
	'Research transparency, reproducibility, and reusability. ',
	'Science must be accessible and beneficial to everyone. ',
	'Our research is fundamentally multidisciplinary and all expertise is valued. ',
	'Recognition and valorization of diverse contributions (Declaration on Research Assessment principles).',
];

function CoreValues() {
	return (
		<div>
			<StyledSection>
				<StyledValues>
					<h2>
						Core Values
					</h2>
					<p>
						{coreValuesList}
					</p>
				</StyledValues>
			</StyledSection>
		</div>
	);
}

export default CoreValues;
