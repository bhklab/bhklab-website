import React, { useEffect, useState } from 'react';
import LabCollaborationsMap2DEmbed from './collaboration-components/LabCollaborationsMap2DEmbed';
import StyledHeading from '../../../styles/StyledHeading';

const Collaboration = () => {
	return (
		<>
			<StyledHeading>Collaborations</StyledHeading>
			<LabCollaborationsMap2DEmbed height={520} detailsHeight={360} />
		</>
	);
};

export default Collaboration;
