import React from 'react';
import { StyledMission } from '../LabMissionStyles';

const labOverallMission = `
			Our overarching goal consists of developing cutting-edge computational tools
			and predictive models to identify new cancer vulnerabilities
			and improve the precision oncology is delivered to patients.`;

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
 * @param {Array} mission
 */
const displayWaysToAchieveMission = (missions) => missions.map((mission) => (
	<p className="ways-to-achieve-mission-single-item">
		{mission}
	</p>
));

/**
 *
 * @returns {React.JSX}
 */
function Mission() {
	return (
		<StyledMission>
			<h1 className="mission-heading">
				Mission
			</h1>
			<p className="overall-mission-section">
				{labOverallMission}
			</p>
			<div className="ways-to-achieve-mission-section">
				{displayWaysToAchieveMission(waysToAchieveMission)}
			</div>
		</StyledMission>

	);
}

export default Mission;
