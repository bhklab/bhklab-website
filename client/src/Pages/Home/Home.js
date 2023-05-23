/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Layout from '../../Components/Utils/Layout';
import ResearchTopics from './ResearchTeams';
import Vision from '../Vision/Vision';

const pmcrtImage = '/images/pmcrt1.jpg';

const Container = styled.div`
	video {
		width: 100%;
		height: auto;
  		/* height: calc(100vh - 70px);	 */
		/* object-fit: cover; */
		filter: brightness(0.6);
	}

	display: flex;
	flex-direction: column;

	/* set twitter timeline container in center */
	.twitter-timeline-container {
		align-self: flex-end;
		margin-right: 100px;
	}
`;

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
					<div id="vision">
						<Vision />
					</div>
					<img src={pmcrtImage} alt="pmcrt" />
					<div id="research-topics">
						<ResearchTopics />
					</div>
				</Container>
			</motion.nav>
		</Layout>
	);
}

export default Home;
