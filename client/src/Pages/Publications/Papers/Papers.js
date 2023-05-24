import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import { motion } from 'framer-motion';
import PaginatedPublications from '../PublicationComponents/PaginatedPublications';
import { PaperCard } from '../PublicationComponents/PublicationCard';
import StyledHeading from '../../../styles/StyledHeading';

const customizedContent = (item, index) => (<PaperCard index={index} publication={item} />);

function Papers() {
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
		<Container fixed>
			{ ready
					&& (
						<motion.nav
							className="navbar"
							initial={{ opacity: 0, y: -50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<StyledHeading> Publications </StyledHeading>
							<PaginatedPublications
								customizedContent={customizedContent}
								publications={publications}
								itemsPerPage={10}
							/>
						</motion.nav>
					)}
		</Container>
	);
}

export default Papers;
