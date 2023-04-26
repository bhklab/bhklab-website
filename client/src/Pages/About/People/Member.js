import Layout from '../../../Components/Utils/Layout';
import React, {useEffect, useState} from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import MemberCard from './MemberComponents/MemberCard';
import Container from '@mui/material/Container';



const Member = () => {
	const {token} = useParams();
	const [member, setMember] = useState({data: {}, ready: false});

	useEffect(() => {
		window.scrollTo(0, 0);
		const getMember = async () => {
			const res = await axios.get(`/api/data/member/${token}`);
			setMember({data: res.data.member, ready: true});
		};
		getMember();
	}, [token]);
	const {image, position, bio, name} = member.data;

	return(
		<Layout>
			<Container fixed>
				{
					member.ready &&
					<MemberCard
						photo={`/images/people/${image}`}
						name={name}
						title={position}
						bio={bio}
					/>
				}
			</Container>
		</Layout>
	);
};

export default Member;
