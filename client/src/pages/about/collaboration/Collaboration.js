import React, { useEffect, useState } from 'react';
import LabCollaborationsMap2DEmbed from './collaboration-components/LabCollaborationsMap2DEmbed';
import StyledHeading from '../../../styles/StyledHeading';

const Collaboration = () => {
	return (
		<>
			<StyledHeading>Collaborations</StyledHeading>
			<LabCollaborationsMap2DEmbed height={600} detailsHeight={600} />
		</>
	);
};

export default Collaboration;
