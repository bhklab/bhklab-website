/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Layout from '../../Components/Utils/Layout';
import ResearchTopics from './ResearchTeams';
// import CollaborationMapBubble
// from '../About/Collaboration/CollaborationComponents/CollectionMapBubble';

const Container = styled.div`
	video {
		width: 100%;
		height: auto;
  		/* height: calc(100vh - 70px);	 */
		/* object-fit: cover; */
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
					<div className="research-topics">
						<ResearchTopics />
					</div>
					{/* <CollaborationMapBubble /> */}
				</Container>
			</motion.nav>
		</Layout>
	);
}

export default Home;
