import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import PaginatedPublications from './presentations-and-publications-components/PaginatedPublications';
import { PreprintCard } from './presentations-and-publications-components/PublicationCards';
import StyledHeading from '../../styles/StyledHeading';
import DisplayContainer from './PresentationsAndPupblicationsStyles';
import PreprintData from './pres-and-pub-data/PreprintData';

// const [selectedYear, setSelectedYear] = useState('')

const customizedContent = (item, index) => (
	<PreprintCard index={index} publication={item} />
);

function Publications() {
	const [ready, setReady] = useState(false);
	const [preprints, setPreprints] = useState({});

	useEffect(() => {
		window.scrollTo(0, 0);
		const getPreprints = async () => {
			setPreprints(
				PreprintData,
			);
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
							<DisplayContainer>
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
