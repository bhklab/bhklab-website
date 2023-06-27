import React from 'react';
import { StyledSection } from './ValuesStyles';
import Vision from '../../Components/LabValuesComponents/Vision';
import StrategicPriorities from '../../Components/LabValuesComponents/StrategicPriorities';
import Culture from '../../Components/LabValuesComponents/Culture';
import OrganizationPillar from '../../Components/LabValuesComponents/OrganizationPillar';

function Values() {
	return (
		<StyledSection>
			<Vision />
			<hr />
			<StrategicPriorities />
			<hr />
			<Culture />
			<hr />
			<OrganizationPillar />
		</StyledSection>
	);
}

export default Values;
