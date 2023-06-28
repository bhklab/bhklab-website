import React from 'react';
import { StyledSection } from './LabMissionStyles';
import Mission from './lab-values-components/Mission';
import Culture from './lab-values-components/Culture';

function Values() {
	return (
		<StyledSection>
			<Mission />
			<hr />
			<Culture />
		</StyledSection>
	);
}

export default Values;
