import React from 'react';
import { StyledSection } from './LabMissionStyles';
import Mission from './lab-mission-components/Mission';
import Culture from './lab-mission-components/Culture';

function LabMission() {
	return (
		<StyledSection>
			<Mission />
			<hr />
			<Culture />
		</StyledSection>
	);
}

export default LabMission;
