/* eslint-disable react/prop-types */
import React from 'react';
import {
	StyledMemberDetailed, StyledInfoDetailed,
	StyledNameDetailed, StyledTitleDetailed, StyledBioDetailed, StyledPiImageDetailed,
} from './MembersInDetailStyles';

function PiInDetail({
	photo, name, title, bio,
}) {
	return (
		<StyledMemberDetailed>
			<StyledPiImageDetailed src={photo} alt={title} />
			<StyledInfoDetailed>
				<StyledNameDetailed>
					<span>{name}</span>
					<a
						href="https://twitter.com/bhaibeka"
						target="_blank"
						rel="noreferrer"
					>
						<img src="/images/social-media/twitter.png" alt="twitter" />
					</a>
					<a
						href="https://www.linkedin.com/in/benhaibekains/"
						target="_blank"
						rel="noreferrer"
					>
						<img src="/images/social-media/linkedin.png" alt="linkedin" />
					</a>
				</StyledNameDetailed>
				<StyledTitleDetailed>{title}</StyledTitleDetailed>
				<StyledBioDetailed>{bio}</StyledBioDetailed>
			</StyledInfoDetailed>
		</StyledMemberDetailed>
	);
}

export default PiInDetail;
