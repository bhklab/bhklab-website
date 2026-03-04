import React, { useEffect, useState } from 'react';
import LabCollaborationsMap2DEmbed from './collaboration-components/LabCollaborationsMap2DEmbed';
import StyledHeading from '../../../styles/StyledHeading';
import StyledCollabs from './CollaborationStyles';

const Collaboration = () => {
	return (
		<>
			<StyledHeading>Collaborations</StyledHeading>
			<StyledCollabs className="map-embed-shell">
				<LabCollaborationsMap2DEmbed height={600} detailsHeight={600} />
			</StyledCollabs>
		</>
	);
};

export default Collaboration;
