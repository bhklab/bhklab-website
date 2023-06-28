import React from 'react';
import { StyledSection } from './LabMissionStyles';
import Mission from '../../Components/LabValuesComponents/Mission';
import Culture from '../../Components/LabValuesComponents/Culture';

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
