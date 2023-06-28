import React from 'react';
import { StyledSection } from './LabMissionStyles';
import Mission from '../../Components/lab-values-components/Mission';
import Culture from '../../Components/lab-values-components/Culture';

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
