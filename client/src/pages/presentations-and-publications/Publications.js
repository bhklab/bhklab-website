import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import PaginatedPublications from './presentations-and-publications-components/PaginatedPublications';
import { PaperCard } from './presentations-and-publications-components/PublicationCards';
import StyledHeading from '../../styles/StyledHeading';
import LeftPositionedTimeline from './Timeline';
import DisplayContainer from './PresentationsAndPupblicationsStyles';
import PublicationData from './pres-and-pub-data/PublicationData';

// const [selectedYear, setSelectedYear] = useState('')

const customizedContent = (item, index) => (
	<PaperCard index={index} publication={item} />
);

function Publications() {
	const [ready, setReady] = useState(false);
	const [publications, setPublications] = useState({});
	const [chosenYear, setChosenYear] = useState('');

	// Used to sort the publication list by month after the specific year has been chosen
	const sortByMonth = (arr) => {
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		return (arr.sort((a, b) => months.indexOf((a.releaseDate).substring(5, 8))
				- months.indexOf((b.releaseDate).substring(5, 8))));
	};

	const selectYear = async (year) => {
		// if the year selected isn't already selected: filter for the newly selected year
		if (chosenYear !== year) {
			setChosenYear(year);
			// const res = await axios.get('/api/data/publications');
			const pubData = PublicationData;
			const filter = pubData.filter((pub) => pub.year === year);
			// sort by year (substring extracts the year such as "2022")
			const sortByYear = filter.sort(
				(a, b) => b.releaseDate.substring(0, 5) - a.releaseDate.substring(0, 5),
			);
			setPublications(// sort condensed list by month
				sortByMonth(sortByYear),
			);
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		const getPublications = async () => {
			// const res = await axios.get('/api/data/publications');
			const pubData = PublicationData;
			const filter = pubData.filter((pub) => pub.year === '2022');
			const sortByYear = filter.sort(
				(a, b) => b.releaseDate.substring(0, 5) - a.releaseDate.substring(0, 5),
			);
			setPublications(// sort condensed list by month
				sortByMonth(sortByYear),
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
							<StyledHeading> Publications </StyledHeading>
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
