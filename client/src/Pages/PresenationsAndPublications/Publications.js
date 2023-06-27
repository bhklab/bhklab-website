import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import { motion } from 'framer-motion';
import PaginatedPublications from '../../Components/HelperComponents/PaginatedPublications';
import { PaperCard } from '../../Components/HelperComponents/PublicationCards';
import StyledHeading from '../../styles/StyledHeading';
import LeftPositionedTimeline from './Timeline';
import DisplayContainer from './PresentationAndPupblicationStyles';

const customizedContent = (item, index) => (
	<PaperCard index={index} publication={item} />
);

function Publications() {
	const [ready, setReady] = useState(false);
	const [publications, setPublications] = useState({});

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
								<LeftPositionedTimeline />
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
