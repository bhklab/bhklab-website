import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import 'primeicons/primeicons.css';
import Container from '@mui/material/Container';
// import { motion } from 'framer-motion';
import { PresentationCard } from './presentations-and-publications-components/PublicationCards';
import PaginatedPublications from './presentations-and-publications-components/PaginatedPublications';
import StyledHeading from '../../styles/StyledHeading';
import LeftPositionedTimeline from './Timeline';
import DisplayContainer from './PresentationsAndPupblicationsStyles';
import PresentationData from './pres-and-pub-data/PresentationData';

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
		} else { // if the year selected is already selected: filter back to the default
			setChosenYear('');
			// const res = await axios.get('/api/data/presentations');
			const presData = PresentationData;
			setPresentation(
				presData.sort((a, b) => new Date(b.date) - new Date(a.date)),
			);
		}
	};
	useEffect(() => {
		window.scrollTo(0, 0);
		const getPresentation = async () => {
			// const res = await axios.get('/api/data/presentations');
			const presData = PresentationData;
			setPresentation(
				presData.sort((a, b) => new Date(b.date) - new Date(a.date)),
			);
			setReady(true);
		};
		getPresentation();
	}, []);

	return (
		<Container maxWidth="lg">
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
	);
}

export default Presentations;
