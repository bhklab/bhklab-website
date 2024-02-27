import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import Layout from '../../../components/utils/Layout';
import { StyledMember } from './MembersOverviewStyles';
import MemberInDetail from './MemberInDetail';

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
		image, position, bio, name,
	} = member.data;

	return (
		<Layout>
			<Container fixed>
				{
					member.ready
					&& (
						<StyledMember>
							<MemberInDetail
								photo={`https://storage.googleapis.com/caboodle-images/member-photos/${image}`}
								name={name}
								title={position}
								bio={bio}
							/>
						</StyledMember>
					)
				}
			</Container>
		</Layout>
	);
}

export default SingleMemberInformation;
