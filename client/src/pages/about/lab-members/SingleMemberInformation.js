import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import Layout from '../../../components/utils/Layout';
import { StyledMember } from './MembersOverviewStyles';
import {
	StyledMemberDetailed, StyledInfoDetailed, StyledImageDetailed,
	StyledNameDetailed, StyledTitleDetailed, StyledBioDetailed, StyledEmailDetailed,
} from './MembersInDetailStyles';

function SingleMemberInformation() {
	const { name: memberName } = useParams();
	const [member, setMember] = useState({});
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const getMember = async () => {
			const res = await axios.get(`/api/data/member/${memberName}`);
			setMember(res.data);
			setReady(true);
		};
		getMember();
	}, [memberName]);

	return (
		<Layout>
			<Container style={{ minHeight: '100vh' }}>
				{
					ready
					&& (
						<StyledMember>
							<StyledMemberDetailed style={{ paddingTop: '150px' }}>
								<StyledImageDetailed src={`https://storage.googleapis.com/caboodle-images/member-photos/${member.image}`} alt={member.position} />
								<StyledInfoDetailed>
									<StyledNameDetailed>
										<p>
											{member.name}
										</p>
									</StyledNameDetailed>
									<StyledEmailDetailed>
										<p>
											(
											{member.preferredEmail}
											)
										</p>
									</StyledEmailDetailed>
									<StyledTitleDetailed>{member.position}</StyledTitleDetailed>
									<div>
										{member.socials.twitter && (
											<a
												href={member.socials.twitter}
												target="_blank"
												rel="noreferrer"
											>
												<img src="/images/social-media/twitter.png" alt="twitter" style={{ width: '30px' }} />
											</a>
										)}
										{member.socials.linkedIn && (
											<a
												href={member.socials.linkedIn}
												target="_blank"
												rel="noreferrer"
											>
												<img src="/images/social-media/linkedin.png" alt="linkedin" style={{ width: '30px' }} />
											</a>
										)}
									</div>
									<StyledBioDetailed>{member.bio}</StyledBioDetailed>
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
