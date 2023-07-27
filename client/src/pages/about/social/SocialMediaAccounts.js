import React from 'react';
import { SocialMediaAccountWrapper } from './SocialStyles';
import Linkedin from '../../../components/social/Linkedin';
import Twitter from '../../../components/social/Twitter';

const TWITTER_SCREEN_NAME = 'bhklab';
const LINKEDIN_URL = 'https://www.linkedin.com/embed/feed/update/urn:li:share:7056441339000877057';

function SocialMediaAccounts() {
	return (
		<SocialMediaAccountWrapper>
			<div className="twitter-wrapper">
				<Twitter screenName={TWITTER_SCREEN_NAME} />
			</div>
			<div className="linkedin-wrapper">
				<Linkedin url={LINKEDIN_URL} />
			</div>
		</SocialMediaAccountWrapper>
	);
}

export default SocialMediaAccounts;
