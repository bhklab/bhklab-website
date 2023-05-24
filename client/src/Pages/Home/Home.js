/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { motion } from 'framer-motion';
import {
	Container, PMCRTImage, PMCRTTowerImage, TeamImage,
} from './HomeStyles';
import Layout from '../../Components/Utils/Layout';
import ResearchTopics from './ResearchTeams';
import Vision from '../Vision/Vision';
import Papers from '../Publications/Papers/Papers';
import Presentation from '../Publications/Presentation/Presentation';
import Software from '../Software/Software';
import People from '../About/People/People';

function Home() {
	return (
		<Layout page="home">
			<motion.nav
				className="navbar"
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Container className="home-container-component">
					<div id="home" className="microsoft-bhklab-video">
						<video autoPlay loop muted>
							{/* <track kind="caption" /> */}
							<source src="/videos/microsoft_bhklab.mp4" type="video/mp4" />
						</video>
					</div>
					<div id="vision">
						<Vision />
					</div>
					<div id="pmcrt-image-container">
						<PMCRTImage />
					</div>
					<div id="research">
						<ResearchTopics />
					</div>
					<div id="pmcrt-tower-image-container">
						<PMCRTTowerImage />
					</div>
					<div id="publications">
						<Papers />
					</div>
					<div id="presentations">
						<Presentation />
					</div>
					<div id="software">
						<Software />
					</div>
					<div id="team-image-container">
						<TeamImage />
					</div>
					<div id="team">
						<People />
					</div>
				</Container>
			</motion.nav>
		</Layout>
	);
}

export default Home;
