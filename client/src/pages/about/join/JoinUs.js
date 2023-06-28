import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import StyledPosition from './PositionCard';
import Layout from '../../../Components/utils/Layout';
import StyledHeading from '../../../styles/StyledHeading';

function JoinUs() {
	const [ready, setReady] = useState(false);
	const [positions, setPositions] = useState([]);

	useEffect(() => {
		const fetchPositions = async () => {
			const { data } = await axios.get('/api/data/positions');
			setPositions(data.positions);
			setReady(true);
		};
		fetchPositions();
	}, []);

	return (
		<Layout>
			<Container>
				<StyledHeading> Join Our Team! </StyledHeading>
				{
					ready
					&& positions.map((position) => (
						<StyledPosition key={position} position={position} />
					))
				}
			</Container>
		</Layout>
	);
}

export default JoinUs;
