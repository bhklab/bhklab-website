import Layout from '../../Components/Utils/Layout';
import React, {useEffect, useState} from 'react';
import 'animate.css/animate.min.css';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import Container from '@mui/material/Container';
import {StyledHeading} from '../../styles/StyledHeading';


const IndivResearch= (props) => {
	const [ready, setReady] = useState(false);
	const [research, setResearch] = useState({});
	const {token} = useParams();

	useEffect(() => {
		window.scrollTo(0, 0);
		const getDataset = async () => {
			const res = await axios.get(`/api/data/researches/${token}`);
			setResearch(res.data.team);
			setReady(true);
		};
		getDataset().then(()=> {setReady(true);});
	}, [token]);

	return(
		<Layout>
			<Container>
				{
					ready &&
						<StyledHeading>
							{research.title}
						</StyledHeading>
				}
			</Container>
		</Layout>
	);
};

export default IndivResearch;
