import React from 'react';
import { StyledSection, StyledVision } from './VisionStyles';
import StrategicPriorities from './StrategicPriorities';

function Vision() {
	return (
		<StyledSection>
			<StyledVision>
				<h1>
					Vision
				</h1>
				<p>
					Our laboratory is committed to bringing the best
					tailored therapy to cancer patients through its
					<br />
					innovative discoveries and methodologies
					in chromatin & epigenetic-based research.
				</p>
			</StyledVision>
			<hr />
			<StrategicPriorities />
		</StyledSection>
	);
}

export default Vision;
