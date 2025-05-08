import React from 'react';
import { XEmbed } from 'react-social-media-embed';
import { Post } from 'bsky-react-post';
// eslint-disable-next-line
import 'bsky-react-post/theme.css';
import { SocialMediaAccountWrapper } from './SocialStyles';
import Linkedin from '../../../components/social/Linkedin';

const LINKEDIN_URL = 'https://www.linkedin.com/embed/feed/update/urn:li:activity:7323789913194127361';

function SocialMediaAccounts() {
	return (
		<SocialMediaAccountWrapper>
			{/* https://bsky-react-post.rhinobase.io/playground */}
			<div className="bsky-wrapper">
				<Post did="bhklab.bsky.social" id="3lo4zccmuws23" />
			</div>
			<div className="twitter-wrapper">
				<XEmbed url="https://x.com/bhklab/status/1918020524396998729" width={325} />
			</div>
			<div className="linkedin-wrapper">
				<Linkedin url={LINKEDIN_URL} />
			</div>
		</SocialMediaAccountWrapper>
	);
}

export default SocialMediaAccounts;
