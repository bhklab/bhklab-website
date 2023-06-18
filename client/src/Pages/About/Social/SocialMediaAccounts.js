import React from 'react';
import styled from 'styled-components';
import Linkedin from '../../../Components/Social/Linkedin';
import Twitter from '../../../Components/Social/Twitter';

const TWITTER_SCREEN_NAME = 'bhklab';
const LINKEDIN_URL = 'https://www.linkedin.com/embed/feed/update/urn:li:share:7056441339000877057';

const SocialMediaAccountWrapper = styled.div`
    margin-top: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 200px;

    @media only screen and (min-width: 2000px) {
        gap: 300px;
    }
`;

function SocialMediaAccounts() {
	return (
		<SocialMediaAccountWrapper>
			<Twitter screenName={TWITTER_SCREEN_NAME} />
			<Linkedin url={LINKEDIN_URL} />
		</SocialMediaAccountWrapper>
	);
}

export default SocialMediaAccounts;
