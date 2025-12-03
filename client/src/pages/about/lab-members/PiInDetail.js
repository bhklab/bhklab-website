/* eslint-disable react/prop-types */
import React from 'react';
import {
	StyledPiInfoDetailed, StyledPiDetailed,
	StyledPiNameDetailed, StyledTitleDetailed, StyledBioDetailed, StyledPiImageDetailed,
} from './MembersInDetailStyles';

function PiInDetail({
	photo, name, title, bio,
}) {
	return (
		<StyledPiDetailed>
			<StyledPiImageDetailed src={photo} alt={title} />
			<StyledPiInfoDetailed>
				<StyledPiNameDetailed>
					<span>{name}</span>
					<div className="social-container">
						<a
							href="https://twitter.com/bhaibeka"
							target="_blank"
							rel="noreferrer"
						>
							<img src="/images/social-media/x.png" alt="twitter" style={{ maxWidth: '25px', borderRadius: '5px' }} />
						</a>
						<a
							href="https://www.linkedin.com/in/benhaibekains/"
							target="_blank"
							rel="noreferrer"
						>
							<img src="/images/social-media/linkedin-icon.png" alt="linkedin" style={{ maxWidth: '25px', borderRadius: '5px' }} />
						</a>
					</div>
				</StyledPiNameDetailed>
				<StyledTitleDetailed>{title}</StyledTitleDetailed>
				<StyledBioDetailed>{bio}</StyledBioDetailed>
			</StyledPiInfoDetailed>
		</StyledPiDetailed>
	);
}

export default PiInDetail;
