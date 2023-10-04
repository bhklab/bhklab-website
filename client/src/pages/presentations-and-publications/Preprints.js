import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import axios from 'axios';
import PaginatedPublications from './presentations-and-publications-components/PaginatedPublications';
import { PreprintCard } from './presentations-and-publications-components/PublicationCards';
import StyledHeading from '../../styles/StyledHeading';
import DisplayContainer from './PresentationsAndPupblicationsStyles';

const customizedContent = (item, index) => (
	<PreprintCard index={index} publication={item} />
);

function Publications() {
	const [ready, setReady] = useState(false);
	const [preprints, setPreprints] = useState({});

	useEffect(() => {
		const getPreprints = async () => {
			const res = await axios.get('/api/data/preprints');
			setPreprints(res.data.preprints);
			setReady(true);
		};
		getPreprints();
	}, []);

	return (
		<Container maxWidth="lg">
			{ ready
					&& (
						<>
							<StyledHeading> Preprints </StyledHeading>
							<DisplayContainer style={{ justifyContent: 'center' }}>
								<PaginatedPublications
									customizedContent={customizedContent}
									publications={preprints}
									itemsPerPage={5}
								/>
							</DisplayContainer>
						</>
					)}
		</Container>
	);
}

export default Publications;
