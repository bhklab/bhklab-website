import React from 'react';
import { StyledSection, StyledVision } from './VisionStyles';
import StrategicPriorities from './StrategicPriorities';
import Culture from './Culture';
import OrganizationPillar from './OrganizationPillar';

const VISION = (
	<p>
		Our laboratory is committed to bringing the best
		tailored therapy to cancer patients through its
		<br />
		innovative discoveries and methodologies
		in chromatin & epigenetic-based research.
	</p>
);

function Vision() {
	return (
		<StyledSection>
			<StyledVision>
				<h1>
					Vision
				</h1>
				{VISION}
			</StyledVision>
			<hr />
			<StrategicPriorities />
			<hr />
			<Culture />
			<hr />
			<OrganizationPillar />
		</StyledSection>
	);
}

export default Vision;
