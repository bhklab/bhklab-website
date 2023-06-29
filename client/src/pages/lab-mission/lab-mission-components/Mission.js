import React from 'react';
import { StyledSection, StyledMission } from '../LabMissionStyles';

const labOverallMission = (
	<p>
		Our overarching goal consists of developing cutting-edge computational tools
		and predictive models to identify new cancer vulnerabilities
		and improve the precision oncology is delivered to patients.
	</p>
);

const waysToAchieveMission = [
	`The development of Machine Learning and Artificial 
		Intelligence approaches for biomedical applications`,
	`The adoption and improvement of findability, accessibility, 
		interoperability, and reusability (FAIR) and Open Science principles`,
	`The training of the next generation following the principles 
		of inclusion, diversity, equity, and accessibility (IDEA)`,
];

/**
 *
 * @returns {React.JSX}
 */
function Mission() {
	return (
		<StyledSection>
			<StyledMission>
				<h1>Mission</h1>
				{labOverallMission}
			</StyledMission>
		</StyledSection>
	);
}

export default Mission;
