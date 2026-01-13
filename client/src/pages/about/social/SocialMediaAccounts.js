import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { XEmbed } from 'react-social-media-embed';
import { Post } from 'bsky-react-post';
// eslint-disable-next-line
import 'bsky-react-post/theme.css';
import { SocialMediaAccountWrapper } from './SocialStyles';
import Linkedin from '../../../components/social/Linkedin';

const mapToObj = (arr) => {
	const obj = {};
	arr.forEach((item) => {
		obj[item.platform] = item;
	});
	return obj;
};
function SocialMediaAccounts() {
	const [isLoading, setLoadingState] = useState(false);
	const [accounts, setAccounts] = useState({});

	useEffect(() => {
		const fetchSocialMediaAccounts = async () => {
			const response = await axios.get('/api/data/socials');
			setAccounts(mapToObj(response.data));
			setLoadingState(true);
		};
		fetchSocialMediaAccounts();
	}, []);

	return (
		isLoading && Object.keys(accounts).length &&
		(<SocialMediaAccountWrapper>
			<div className="bsky-wrapper">
				<Post did={accounts.bluesky.credentials} id={accounts.bluesky.id} />
			</div>
			<div className="twitter-wrapper">
				<XEmbed url={accounts.twitter.url} width={325} />
			</div>
			<div className="linkedin-wrapper">
				<Linkedin url={accounts.linkedin.url} />
			</div>
		</SocialMediaAccountWrapper>
		)
	);
}

export default SocialMediaAccounts;
