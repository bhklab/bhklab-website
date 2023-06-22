import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'primeicons/primeicons.css';
import Container from '@mui/material/Container';
import { motion } from 'framer-motion';
import { PresentationCard } from '../HelperComponents/PublicationCard';
import PaginatedPublications from '../HelperComponents/PaginatedPublications';
import StyledHeading from '../../../styles/StyledHeading';

const customizedContent = (item, index) => (
	<PresentationCard key={index} publication={item} />
);

function Presentation() {
	const [ready, setReady] = useState(false);
	const [presentations, setPresentation] = useState({});

	useEffect(() => {
		window.scrollTo(0, 0);
		const getPresentation = async () => {
			const res = await axios.get('/api/data/presentations');
			setPresentation(res.data.presentations.sort((a, b) => new Date(b.date) - new Date(a.date)));
			setReady(true);
		};
		getPresentation();
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
						<StyledHeading noTopMargin> Presentations </StyledHeading>
						<PaginatedPublications
							customizedContent={customizedContent}
							publications={presentations}
							itemsPerPage={5}
						/>
					</motion.nav>
				)}
		</Container>
	);
}

export default Presentation;
