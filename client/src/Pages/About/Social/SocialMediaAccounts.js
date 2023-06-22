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
    /* gap: 20px; */

    /* @media only screen and (min-width: 1000px) {
        gap: 50px;
    }

    @media only screen and (min-width: 1400px) {
        gap: 100px;
    }

    @media only screen and (min-width: 2000px) {
        gap: 300px;
    } */

    .linkedin-wrapper {
        border: 1px solid black;
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
