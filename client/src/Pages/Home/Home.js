import React from 'react';
import styled from 'styled-components';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { motion } from 'framer-motion';
import Layout from '../../Components/Utils/Layout';
import { ResearchTopics } from './ResearchTeams';
import { StyledSection } from '../../styles/StyledPage';
import CollaborationMapBubble from '../About/Collaboration/CollaborationComponents/CollectionMapBubble';

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
		//background-image: url('./images/pmcrt1.jpg');
	.header{
		padding: 50px 5%;
		color: black;
		height: 60vh;
		font-size: 24px;
		text-align: center;
		img {
			margin-top: 50px;
			width: 300px;
		}
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
					<div className="header">
						<div>Bioinformatics and Computational Genomics Laboratory</div>
						<img src="/images/Logo/bhklab-logo.png" alt="logo" />
					</div>
					<ResearchTopics />
					<CollaborationMapBubble />
					<StyledSection>
						<TwitterTimelineEmbed
							sourceType="profile"
							screenName="bhklab"
							options={{ width: 800, height: 300 }}
							tweetLimit={5}
						/>
					</StyledSection>
				</Container>
			</motion.nav>
		</Layout>
	);
}

export default Home;
