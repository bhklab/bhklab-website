import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'primeicons/primeicons.css';
import Container from '@mui/material/Container';
import { motion } from 'framer-motion';
import { PresentationCard } from './helper-components/PublicationCards';
import PaginatedPublications from './helper-components/PaginatedPublications';
import StyledHeading from '../../styles/StyledHeading';
import LeftPositionedTimeline from './Timeline';
import DisplayContainer from './PresentationsAndPupblicationsStyles';

const customizedContent = (item, index) => (
	<PresentationCard key={index} publication={item} />
);

function Presentations() {
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
		<Container maxWidth="lg">
			{ ready
				&& (
					<motion.nav
						className="navbar"
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<StyledHeading
							noTopMargin
							className="presentations-heading"
						>
							Presentations
						</StyledHeading>
						<DisplayContainer className="presentations-container">
							<LeftPositionedTimeline />
							<PaginatedPublications
								customizedContent={customizedContent}
								publications={presentations}
								itemsPerPage={5}
							/>
						</DisplayContainer>
					</motion.nav>
				)}
		</Container>
	);
}

export default Presentations;
