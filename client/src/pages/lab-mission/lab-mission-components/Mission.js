import React from 'react';
import { StyledMission } from '../LabMissionStyles';

const labOverallMission = () =>	(
	<>
		Our overarching goal consists of developing cutting-edge
		{' '}
		<span className="highlight-keywords">
			computational tools
		</span>
		{' '}
		and
		{' '}
		<span className="highlight-keywords">
			predictive models
		</span>
		{' '}
		to identify new cancer vulnerabilities and
		improve the way precision oncology is delivered to patients.
	</>
);

const waysToAchieveMission = [
	<>
		<img
			src="/images/Logo/deep-learning.png"
			alt="deep-learning"
		/>
		<p>
			The development of
			{' '}
			<a
				href="https://www.ibm.com/topics/machine-learning"
				target="_blank"
				rel="noreferrer"
			>
				Machine Learning
			</a>
			{' '}
			and
			{' '}
			<a
				href="https://www.ibm.com/topics/artificial-intelligence"
				target="_blank"
				rel="noreferrer"
			>
				Artificial Intelligence
			</a>
			{' '}
			approaches for biomedical applications
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
				Open Science
			</a>
			{' '}
			principles
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
				{labOverallMission()}
			</p>
			<div className="ways-to-achieve-mission-section">
				{displayWaysToAchieveMission(waysToAchieveMission)}
			</div>
		</StyledMission>
	);
}

export default Mission;
