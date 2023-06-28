import React from 'react';
import { StyledSection } from './ValuesStyles';
import Vision from './lab-values-components/Vision';
import StrategicPriorities from './lab-values-components/StrategicPriorities';
import Culture from './lab-values-components/Culture';
import OrganizationPillar from './lab-values-components/OrganizationPillar';

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
