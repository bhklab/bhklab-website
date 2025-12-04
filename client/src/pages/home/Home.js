/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
	Container,
	PMCRTImage,
	PMCRTTowerImage,
	TeamImage,
	BHKLabImage,
	StyledHome,
	StyledLabVideo,
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
	// smooth scroll to selected hashId once the page has been rendered
	useEffect(() => {
		const { hash } = window.location;
		if (hash) {
			setTimeout(() => {
				const element = document.querySelector(hash);
				if (element) {
					element.scrollIntoView({ behavior: 'smooth' });
				}
			}, 1000);
		}
	}, []);
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
						<PMCRTImage />
						<div id="research-axis" className="home-component-sub-section">
							<ResearchAxis />
						</div>
						<PMCRTTowerImage />
						<div id="preprints" className="home-publication-and-presentation-section">
							<Preprints />
						</div>
						<div className="divider">
							<hr />
						</div>
						<div id="publications" className="home-publication-and-presentation-section">
							<Publications />
						</div>
						<div className="divider">
							<hr />
						</div>
						<div id="presentations" className="home-publication-and-presentation-section">
							<Presentations />
						</div>
						<BHKLabImage />
						<div id="softwares" className="home-component-sub-section">
							<Software />
						</div>
						<TeamImage />
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
