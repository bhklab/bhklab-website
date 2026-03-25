import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'primeicons/primeicons.css';
import Container from '@mui/material/Container';
import { PresentationCard } from './presentations-and-publications-components/PublicationCards';
import PaginatedPublications from './presentations-and-publications-components/PaginatedPublications';
import StyledHeading from '../../styles/StyledHeading';
import LeftPositionedTimeline from './Timeline';
import DisplayContainer from './PresentationsAndPupblicationsStyles';

const customizedContent = (item, index) => <PresentationCard key={index} publication={item} />;

function Presentations() {
	const [ready, setReady] = useState(false);
	const [presentations, setPresentation] = useState({});
	const [chosenYear, setChosenYear] = useState('2026');

	useEffect(() => {
		const getPresentations = async () => {
			const res = await axios.get('/api/data/presentations');
			res.data.presentations.sort((a, b) => new Date(b.date) - new Date(a.date));
			const filter = res.data.presentations.filter(
				(pres) =>
					pres.date.substring(0, 10) >= `${chosenYear}-00-00` &&
					// eslint-disable-next-line radix
					pres.date < `${(parseInt(chosenYear) + 1).toString().substring(0, 10)}-00-00`,
			);
			const sortByYear = filter.sort(
				// sort condensed list by month
				(a, b) => new Date(b.date) - new Date(a.date),
			);
			setPresentation(sortByYear);
			setReady(true);
		};
		getPresentations();
	}, [chosenYear]);

	return (
		<Container maxWidth="lg">
			{ready && (
				<>
					<StyledHeading noTopMargin className="presentations-heading">
						Presentations
					</StyledHeading>
					<DisplayContainer className="presentations-container">
						<LeftPositionedTimeline setChosenYear={setChosenYear} chosenYear={chosenYear} />
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
