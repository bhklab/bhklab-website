import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import 'primeicons/primeicons.css';
import Container from '@mui/material/Container';
import { PresentationCard } from './presentations-and-publications-components/PublicationCards';
import PaginatedPublications from './presentations-and-publications-components/PaginatedPublications';
import StyledHeading from '../../styles/StyledHeading';
import LeftPositionedTimeline from './Timeline';
import DisplayContainer from './PresentationsAndPupblicationsStyles';
import PresentationData from './pres-and-pub-data/PresentationData';
import Layout from '../../components/utils/Layout';

const customizedContent = (item, index) => (
	<PresentationCard key={index} publication={item} />
);

function Presentations() {
	const [ready, setReady] = useState(false);
	const [presentations, setPresentation] = useState({});
	const [chosenYear, setChosenYear] = useState('');

	// Setting publications object array to only contain publications of selected year
	const selectYear = async (year) => {
		// if the year selected isn't already selected: filter for the newly selected year
		if (chosenYear !== year) {
			setChosenYear(year);
			// const res = await axios.get('/api/data/presentations');
			const presData = PresentationData;
			const filter = presData.filter(
				(pres) => pres.date.substring(0, 10) >= (`${year}-00-00`)
				// eslint-disable-next-line radix
				&& pres.date < `${((parseInt(year) + 1).toString()).substring(0, 10)}-00-00`,
			);
			setPresentation(
				filter.sort((a, b) => new Date(b.date) - new Date(a.date)),
			);
		}
	};
	useEffect(() => {
		const getPresentation = async () => {
			// const res = await axios.get('/api/data/presentations');
			const presData = [...PresentationData];
			// display 5 most recent on load
			for (let i = presData.length - 1; i >= 5; i -= 1) {
				presData.splice(i, 1);
			}
			presData.sort(
				(a, b) => new Date(b.date) - new Date(a.date),
			);
			setPresentation(
				presData,
			);

			setReady(true);
		};
		getPresentation();
	}, []);

	return (
		<Layout>
			<Container maxWidth="lg" sx={{ height: '1000px' }}>
				{ ready
					&& (
						<>
							<StyledHeading
								noTopMargin
								className="presentations-heading"
							>
								Presentations
							</StyledHeading>
							<DisplayContainer className="presentations-container">
								<LeftPositionedTimeline selectYear={selectYear} />
								<PaginatedPublications
									customizedContent={customizedContent}
									publications={presentations}
									itemsPerPage={5}
								/>
							</DisplayContainer>
						</>
					)}
			</Container>
		</Layout>
	);
}

export default Presentations;
