import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import PaginatedPublications from './presentations-and-publications-components/PaginatedPublications';
import { PaperCard } from './presentations-and-publications-components/PublicationCards';
import StyledHeading from '../../styles/StyledHeading';
import LeftPositionedTimeline from './Timeline';
import DisplayContainer from './PresentationsAndPupblicationsStyles';

const customizedContent = (item, index) => <PaperCard index={index} publication={item} />;

function Publications() {
	const [ready, setReady] = useState(false);
	const [publications, setPublications] = useState({});
	const [chosenYear, setChosenYear] = useState('2025');

	useEffect(() => {
		const getPublications = async () => {
			const res = await axios.get('/api/data/publications');
			res.data.publications.sort((a, b) => new Date(b.date) - new Date(a.date));
			const filter = res.data.publications.filter((pub) => pub.year.toString() === chosenYear);
			const sortByYear = filter.sort(
				// sort condensed list by month
				(a, b) => new Date(b.date) - new Date(a.date),
			);
			setPublications(sortByYear);
			setReady(true);
		};
		getPublications();
	}, [chosenYear]);

	return (
		<Container maxWidth="lg">
			{ready && (
				<>
					<StyledHeading sx={{ marginTop: '0px' }}> Publications </StyledHeading>
					<DisplayContainer>
						<LeftPositionedTimeline setChosenYear={setChosenYear} chosenYear={chosenYear} />
						<PaginatedPublications customizedContent={customizedContent} publications={publications} itemsPerPage={5} />
					</DisplayContainer>
				</>
			)}
		</Container>
	);
}

export default Publications;
