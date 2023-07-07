import React from 'react';
import { StyledMissionContainer } from './LabMissionStyles';
import Mission from './lab-mission-components/Mission';
// import Culture from './lab-mission-components/Culture';
import CoreValues from './lab-mission-components/CoreValues';

function LabMission() {
	return (
		<StyledMissionContainer>
			<Mission />
			<hr />
			<CoreValues />
			{/* <hr />
			<Culture /> */}
		</StyledMissionContainer>
	);
}

export default LabMission;
