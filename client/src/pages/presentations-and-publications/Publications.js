import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import PaginatedPublications from './presentations-and-publications-components/PaginatedPublications';
import { PaperCard } from './presentations-and-publications-components/PublicationCards';
import StyledHeading from '../../styles/StyledHeading';
import LeftPositionedTimeline from './Timeline';
import DisplayContainer from './PresentationsAndPupblicationsStyles';

const customizedContent = (item, index) => (
	<PaperCard index={index} publication={item} />
);

function Publications() {
	const [ready, setReady] = useState(false);
	const [publications, setPublications] = useState({});
	const [chosenYear, setChosenYear] = useState('');

	const selectYear = async (year) => {
		// if the year selected isn't already selected: filter for the newly selected year
		if (chosenYear !== year) {
			setChosenYear(year);

			const res = await axios.get('/api/data/publications');
			res.data.publications.sort((a, b) => new Date(b.date) - new Date(a.date));
			const filter = res.data.publications.filter((pub) => pub.year.toString() === year);
			const sortByYear = filter.sort(// sort condensed list by month
				(a, b) => new Date(b.date) - new Date(a.date),
			);
			setPublications(
				sortByYear,
			);
		}
	};

	useEffect(() => {
		const getPublications = async () => {
			const res = await axios.get('/api/data/publications');
			res.data.publications.sort((a, b) => new Date(b.date) - new Date(a.date));

			// display 5 most recent on load
			for (let i = res.data.publications.length - 1; i >= 5; i -= 1) {
				res.data.publications.splice(i, 1);
			}
			setPublications(
				res.data.publications,
			);
			setReady(true);
		};
		getPublications();
	}, []);

	return (
		<Container maxWidth="lg">
			{ ready
					&& (
						<>
							<StyledHeading sx={{ marginTop: '0px' }}> Publications </StyledHeading>
							<DisplayContainer>
								<LeftPositionedTimeline selectYear={selectYear} />
								<PaginatedPublications
									customizedContent={customizedContent}
									publications={publications}
									itemsPerPage={5}
								/>
							</DisplayContainer>
						</>
					)}
		</Container>
	);
}

export default Publications;
