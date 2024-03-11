import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import Layout from '../../../components/utils/Layout';
import { StyledMember } from './MembersOverviewStyles';
import {
	StyledMemberDetailed, StyledInfoDetailed, StyledImageDetailed,
	StyledNameDetailed, StyledTitleDetailed, StyledBioDetailed,
} from './MembersInDetailStyles';

function SingleMemberInformation() {
	const { name: memberName } = useParams();
	const [member, setMember] = useState({ data: {}, ready: false });

	useEffect(() => {
		const getMember = async () => {
			const res = await axios.get(`/api/data/member/${memberName}`);
			setMember({ data: res.data.member, ready: true });
		};
		getMember();
	}, [memberName]);

	const {
		image, position, bio, name, twitter, linkedIn, email,
	} = member.data;

	return (
		<Layout>
			<Container style={{ minHeight: '100vh' }}>
				{
					member.ready
					&& (
						<StyledMember>
							<StyledMemberDetailed style={{ paddingTop: '150px' }}>
								<StyledImageDetailed src={`https://storage.googleapis.com/caboodle-images/member-photos/${image}`} alt={position} />
								<StyledInfoDetailed>
									<StyledNameDetailed>
										<span>{name}</span>
										<span>
											(
											{email}
											)
										</span>
										{twitter && (
											<a
												href={twitter}
												target="_blank"
												rel="noreferrer"
											>
												<img src="/images/social-media/twitter.png" alt="twitter" style={{ width: '30px' }} />
											</a>
										)}
										{linkedIn && (
											<a
												href={linkedIn}
												target="_blank"
												rel="noreferrer"
											>
												<img src="/images/social-media/linkedin.png" alt="linkedin" style={{ width: '30px' }} />
											</a>
										)}
									</StyledNameDetailed>
									<StyledTitleDetailed>{position}</StyledTitleDetailed>
									<StyledBioDetailed>{bio}</StyledBioDetailed>
								</StyledInfoDetailed>
							</StyledMemberDetailed>
						</StyledMember>
					)
				}
			</Container>
		</Layout>
	);
}

export default SingleMemberInformation;
