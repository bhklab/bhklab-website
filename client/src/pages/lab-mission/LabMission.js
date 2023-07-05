import React from 'react';
import { StyledSection } from './LabMissionStyles';
import Mission from './lab-mission-components/Mission';
// import Culture from './lab-mission-components/Culture';
import CoreValues from './lab-mission-components/CoreValues';

function LabMission() {
	return (
		<StyledSection>
			<Mission />
			<hr />
			<CoreValues />
			{/* <hr />
			<Culture /> */}
		</StyledSection>
	);
}

export default LabMission;
