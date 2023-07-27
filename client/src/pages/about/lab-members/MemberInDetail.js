/* eslint-disable react/prop-types */
import React from 'react';
import {
	StyledMemberDetailed, StyledInfoDetailed, StyledImageDetailed,
	StyledNameDetailed, StyledTitleDetailed, StyledBioDetailed,
} from './MembersInDetailStyles';

function MemberInDetail({
	photo, name, title, bio,
}) {
	return (
		<StyledMemberDetailed>
			<StyledImageDetailed src={photo} alt={title} />
			<StyledInfoDetailed>
				<StyledNameDetailed>
					<span>{name}</span>
				</StyledNameDetailed>
				<StyledTitleDetailed>{title}</StyledTitleDetailed>
				<StyledBioDetailed>{bio}</StyledBioDetailed>
			</StyledInfoDetailed>
		</StyledMemberDetailed>
	);
}

export default MemberInDetail;
