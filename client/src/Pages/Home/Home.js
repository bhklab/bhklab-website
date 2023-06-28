/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { motion } from 'framer-motion';
import {
	Container, PMCRTImage, PMCRTTowerImage, TeamImage, BHKLabImage, StyledHome,
} from './HomeStyles';
import Layout from '../../Components/Utils/Layout';
import ResearchTopics from './ResearchTeams';
import LabMission from '../LabMission/LabMission';
import Publications from '../PresenationsAndPublications/Publications';
import Presentations from '../PresenationsAndPublications/Presentations';
import Software from '../web-apps-and-packages/WebAppsAndPackages';
import LabMembers from '../About/lab-members/LabMembers';
import SocialMediaAccounts from '../About/social/SocialMediaAccounts';

function Home() {
	return (
		<Layout page="home">
			<motion.nav
				className="navbar"
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Container className="home-component-container">
					<StyledHome className="home-component">
						<div id="home" className="microsoft-bhklab-video">
							<video autoPlay loop muted>
								{/* <track kind="caption" /> */}
								<source src="/videos/microsoft_bhklab.mp4" type="video/mp4" />
							</video>
						</div>
						<div id="mission" className="home-component-sub-section">
							<LabMission />
						</div>
						<div id="pmcrt-image-container" className="home-component-sub-section">
							<PMCRTImage />
						</div>
						<div id="research" className="home-component-sub-section">
							<ResearchTopics />
						</div>
						<div id="pmcrt-tower-image-container" className="home-component-sub-section">
							<PMCRTTowerImage />
						</div>
						<div id="publications" className="home-component-sub-section">
							<Publications />
						</div>
						<div className="home-component-sub-section">
							<hr />
						</div>
						<div id="presentations" className="home-component-sub-section">
							<Presentations />
						</div>
						<div id="bhklab-logo-image-container" className="home-component-sub-section">
							<BHKLabImage />
						</div>
						<div id="softwares" className="home-component-sub-section">
							<Software />
						</div>
						<div id="team-image-container" className="home-component-sub-section">
							<TeamImage />
						</div>
						<div id="team" className="home-component-sub-section">
							<LabMembers />
						</div>
						<div id="social-media-accounts" className="home-component-sub-section">
							<hr />
							<SocialMediaAccounts />
						</div>
					</StyledHome>
				</Container>
			</motion.nav>
		</Layout>
	);
}

export default Home;
