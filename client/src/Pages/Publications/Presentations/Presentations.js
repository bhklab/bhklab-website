import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'primeicons/primeicons.css';
import Container from '@mui/material/Container';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { PresentationCard } from '../HelperComponents/PublicationCard';
import PaginatedPublications from '../HelperComponents/PaginatedPublications';
import StyledHeading from '../../../styles/StyledHeading';
import LeftPositionedTimeline from '../Timeline';

const PresentationsContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 50px;
`;

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
						<PresentationsContainer className="presentations-container">
							<LeftPositionedTimeline />
							<PaginatedPublications
								customizedContent={customizedContent}
								publications={presentations}
								itemsPerPage={5}
							/>
						</PresentationsContainer>
					</motion.nav>
				)}
		</Container>
	);
}

export default Presentations;
