/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Container from '@mui/material/Container';

import StyledHeading from '../../../styles/StyledHeading';

import AlumniIndustryExplorer from './AlumniIndustryExplorer';

function LabMembers() {
	const [people, setPeople] = useState([]);

	const [isLoading, setIsLoading] = useState(true);

	const [error, setError] = useState('');

	useEffect(() => {
		let isMounted = true;

		const getPeople = async () => {
			try {
				const res = await axios.get('/api/data/alumni');

				const alumni = Array.isArray(res.data?.alumni) ? res.data.alumni : [];

				if (isMounted) {
					setPeople(alumni);

					setError('');
				}
			} catch (err) {
				console.error('Unable to load alumni:', err);

				if (isMounted) {
					setError('Unable to load alumni.');
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		getPeople();

		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<Container
			sx={{
				textAlign: 'center',
			}}
		>
			<StyledHeading>Alumni</StyledHeading>

			{isLoading && <p>Loading alumni...</p>}

			{!isLoading && error && <p>{error}</p>}

			{!isLoading && !error && <AlumniIndustryExplorer alumni={people} />}
		</Container>
	);
}

export default LabMembers;
