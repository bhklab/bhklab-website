import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import Layout from '../../../Components/utils/Layout';
import { StyledMember } from './MembersOverviewStyles';
import MemberInDetail from './MemberInDetail';

// TODO: Not sure if this component is being used anywhere; ask Parinaz in case of any confusion

function Member() {
	const { token } = useParams();
	const [member, setMember] = useState({ data: {}, ready: false });

	useEffect(() => {
		window.scrollTo(0, 0);
		const getMember = async () => {
			const res = await axios.get(`/api/data/member/${token}`);
			setMember({ data: res.data.member, ready: true });
		};
		getMember();
	}, [token]);

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
								photo={`/images/people/${image}`}
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

export default Member;
