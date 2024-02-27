/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { motion } from 'framer-motion';
import {
	Container, PMCRTImage, PMCRTTowerImage, TeamImage, BHKLabImage, StyledHome, StyledLabVideo,
} from './HomeStyles';
import Layout from '../../components/utils/Layout';
import ResearchAxis from '../research-axis/ResearchAxis';
import LabMission from '../lab-mission/LabMission';
import Preprints from '../presentations-and-publications/Preprints';
import Publications from '../presentations-and-publications/Publications';
import Presentations from '../presentations-and-publications/Presentations';
import Software from '../web-apps-and-packages/WebAppsAndPackages';
import LabMembers from '../about/lab-members/LabMembers';
import SocialMediaAccounts from '../about/social/SocialMediaAccounts';
import LabAlumni from '../about/alumni/LabAlumni';

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
						<StyledLabVideo id="home">
							<video autoPlay loop muted playsInline>
								{/* <track kind="caption" /> */}
								<source src="/videos/lab_video_V3.mp4" type="video/mp4" />
							</video>
						</StyledLabVideo>
						<div id="mission" className="home-component-sub-section">
							<LabMission />
						</div>
						<div id="pmcrt-image-container" className="home-component-sub-section">
							<PMCRTImage />
						</div>
						<div id="research-axis" className="home-component-sub-section">
							<ResearchAxis />
						</div>
						<div id="pmcrt-tower-image-container" className="home-component-sub-section">
							<PMCRTTowerImage />
						</div>
						<div id="preprints" className="home-publication-and-presentation-section">
							<Preprints />
						</div>
						<div className="home-component-sub-section">
							<hr />
						</div>
						<div id="publications" className="home-publication-and-presentation-section">
							<Publications />
						</div>
						<div className="home-component-sub-section">
							<hr />
						</div>
						<div id="presentations" className="home-publication-and-presentation-section">
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
						<div id="team" className="home-component-sub-section">
							<LabAlumni />
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
