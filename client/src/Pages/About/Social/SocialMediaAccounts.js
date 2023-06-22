import React from 'react';
import styled from 'styled-components';
import Linkedin from '../../../Components/Social/Linkedin';
import Twitter from '../../../Components/Social/Twitter';

const TWITTER_SCREEN_NAME = 'bhklab';
const LINKEDIN_URL = 'https://www.linkedin.com/embed/feed/update/urn:li:share:7056441339000877057';

const SocialMediaAccountWrapper = styled.div`
    margin-top: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 50px;

    @media only screen and (min-width: 1600px) {
        justify-content: center;
        gap: 100px;
    }

    @media only screen and (min-width: 1900px) {
        gap: 200px;
    }
`;

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
