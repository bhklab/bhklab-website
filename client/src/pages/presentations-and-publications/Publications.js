import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import { motion } from 'framer-motion';
import PaginatedPublications from './presentations-and-publications-components/PaginatedPublications';
import { PaperCard } from './presentations-and-publications-components/PublicationCards';
import StyledHeading from '../../styles/StyledHeading';
import LeftPositionedTimeline from './Timeline';
import DisplayContainer from './PresentationsAndPupblicationsStyles';

// const [selectedYear, setSelectedYear] = useState('')

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
			const filter = res.data.publications.filter((pub) => pub.year === year);
			setPublications(
				filter.sort((a, b) => new Date(b.year) - new Date(a.year)),
			);
		} else { // if the year selected is already selected: filter back to the default
			setChosenYear('');
			const res = await axios.get('/api/data/publications');
			setPublications(
				res.data.publications.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)),
			);
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		const getPublications = async () => {
			const res = await axios.get('/api/data/publications');
			setPublications(
				res.data.publications.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)),
			);
			setReady(true);
		};
		getPublications();
	}, []);

	return (
		<Container maxWidth="lg">
			{ ready
					&& (
						<motion.nav
							className="navbar"
							initial={{ opacity: 0, y: -50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<StyledHeading> Publications </StyledHeading>
							<DisplayContainer>
								<LeftPositionedTimeline selectYear={selectYear} />
								<PaginatedPublications
									customizedContent={customizedContent}
									publications={publications}
									itemsPerPage={5}
								/>
							</DisplayContainer>
						</motion.nav>
					)}
		</Container>
	);
}

export default Publications;
