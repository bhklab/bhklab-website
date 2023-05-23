/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { motion } from 'framer-motion';
import { Container, PMCRTImage } from './HomeStyles';
import Layout from '../../Components/Utils/Layout';
import ResearchTopics from './ResearchTeams';
import Vision from '../Vision/Vision';

function Home() {
	return (
		<Layout page="home">
			<motion.nav
				className="navbar"
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Container>
					<div className="microsoft-bhklab-video">
						<video autoPlay loop muted>
							{/* <track kind="caption" /> */}
							<source src="/videos/microsoft_bhklab.mp4" type="video/mp4" />
						</video>
					</div>
					<div id="vision-section-container">
						<Vision />
					</div>
					<div id="pmcrt-image-container">
						<PMCRTImage />
					</div>
					<div id="research-topics-container">
						<ResearchTopics />
					</div>
				</Container>
			</motion.nav>
		</Layout>
	);
}

export default Home;
