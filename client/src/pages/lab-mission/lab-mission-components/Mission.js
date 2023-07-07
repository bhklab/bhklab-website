import React from 'react';
import { StyledMission } from '../LabMissionStyles';

const labOverallMission = `
			Our overarching goal consists of developing cutting-edge computational tools
			and predictive models to identify new cancer vulnerabilities
			and improve the precision oncology is delivered to patients`;

const waysToAchieveMission = [
	<>
		<img
			src="/images/Logo/artificial-intelligence.png"
			alt="artifical-intelligence"
		/>
		<p>
			The development of Machine Learning and Artificial
			Intelligence approaches for biomedical applications
		</p>
	</>,
	<>
		<img
			src="/images/Logo/fair-research.png"
			alt="fair-research"
		/>
		<p>
			The adoption and improvement of findability, accessibility,
			interoperability, and reusability
			{' '}
			<a
				href="https://www.go-fair.org/fair-principles/"
				target="_blank"
				rel="noreferrer"
			>
				(FAIR)
			</a>
			{' '}
			and
			{' '}
			<a
				href="https://www.unesco.org/en/open-science/about"
				target="_blank"
				rel="noreferrer"
			>
				Open Science principles
			</a>
		</p>
	</>,
	<>
		<img
			src="/images/Logo/diversity.png"
			alt="diversity"
		/>
		<p>
			The training of the next generation following the principles
			of inclusion, diversity, equity, and accessibility
			{' '}
			<a
				href="https://en.ccunesco.ca/-/media/Files/Unesco/Resources/2021/09/ToolkitIDEA.pdf"
				target="_blank"
				rel="noreferrer"
			>
				(IDEA)
			</a>
		</p>
	</>,
];

/**
 *
 * @param {Array} mission
 */
const displayWaysToAchieveMission = (missions) => missions.map((mission) => (
	<div className="ways-to-achieve-mission-single-item">
		{mission}
	</div>
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
			<p className="overall-mission-content-section">
				{labOverallMission}
			</p>
			<div className="ways-to-achieve-mission-section">
				{displayWaysToAchieveMission(waysToAchieveMission)}
			</div>
		</StyledMission>

	);
}

export default Mission;
