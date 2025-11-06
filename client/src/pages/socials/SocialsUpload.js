import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { XEmbed } from 'react-social-media-embed';
import { Post } from 'bsky-react-post';
import Linkedin from '../../components/social/Linkedin';
import { SocialMediaAccountWrapper } from '../about/social/SocialStyles';
import styled from 'styled-components';


const Container = styled.div`
	margin: 40px auto 0 auto;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const LinkContainer = styled.div`
	margin: 40px auto 0 auto;
	display: flex;
	flex-direction: column;
	gap: 10px;
`

// eslint-disable-next-line
const SocialsUpload = () => {
	const [bskyUrl, setBskyUrl] = useState('');
	const [twitterUrl, setTwitterUrl] = useState('');
	const [linkedinUrl, setLinkedinUrl] = useState('');
	useEffect(() => {
		const getLinks = async () => {
			try {
				const socialLinks = await axios.get('/api/data/lab-socials/links');
				console.log(socialLinks.data);
				socialLinks.data.forEach((link) => {
					if (link.type === 'bluesky') {
						setBskyUrl(link.url);
					} else if (link.type === 'twitter') {
						setTwitterUrl(link.url);
					} else if (link.type === 'linkedin') {
						setLinkedinUrl(link.url);
					}
				});
			} catch (error) {
				console.log(error);
			}
		};
		getLinks();
	}, []);

	return (
		<Container>
			<div>
				<input type="text"/>
			</div>
			<div>
				<SocialMediaAccountWrapper>
					{/* https://bsky-react-post.rhinobase.io/playground */}
					<div className="bsky-wrapper">
						<Post did="bhklab.bsky.social" id={bskyUrl} />
					</div>
					<div className="twitter-wrapper">
						<XEmbed url={twitterUrl} width={325} />
					</div>
					<div className="linkedin-wrapper">
						<Linkedin url={linkedinUrl} />
					</div>
				</SocialMediaAccountWrapper>
			</div>
		</Container>
	);
};

export default SocialsUpload;
