import { Link } from 'react-router-dom';
import React from 'react';
import StyledFooter from './FooterStyle';

// list of objects storing information for social media accounts
const socialMediaAccounts = [
	{
		name: 'github',
		url: 'https://github.com/bhklab',
		'img-src': '/images/social-media/github.png',
		'alt-text': 'github',
	},
	{
		name: 'twitter',
		url: 'https://twitter.com/bhklab',
		'img-src': '/images/social-media/twitter.png',
		'alt-text': 'twitter',
	},
	{
		name: 'linkedin',
		url: 'https://www.linkedin.com/in/bhklab/',
		'img-src': '/images/social-media/linkedin.png',
		'alt-text': 'linkedin',
	},
];

/**
 *
 * @param {Array} links - an array of links to be rendered
 */
const renderSocialMediaLinks = (links) => links.map((link) => (
	<a
		href={link.url}
		target="_blank"
		rel="noreferrer"
	>
		<img
			src={link['img-src']}
			alt={link['alt-text']}
		/>
	</a>
));

/**
 *
 * @returns {React.JSX} - footer component
 */
function Footer() {
	return (
		<StyledFooter className="footer-container">
			<div className="all-links-container">
				<div className="grouped-links-container">
					<a href="#research"> Research </a>
					<a href="#people"> People </a>
					<a href="/collaboration"> Collaboration </a>
				</div>
				<div className="grouped-links-container">
					<a href="#publications"> Publications </a>
					<a href="#presentations"> Presentations </a>
					<a href="#software"> Software </a>
				</div>
				{/* TODO: This has to be updated!! */}
				<div className="grouped-links-container">
					<a href="/resources"> Resources </a>
					<a href="/datasets"> Datasets </a>
					<a
						href="https://github.com/bhklab"
						target="_blank"
						rel="noreferrer"
					>
						Github
					</a>
				</div>
				<div className="grouped-links-container">
					<Link to="/contact"> Contact Us </Link>
					<Link to="/positions"> Join Us </Link>
				</div>
			</div>
			<div className="footer-social-media-links">
				{
					renderSocialMediaLinks(socialMediaAccounts)
				}
				<span className="footer-text">
					BHKLab ©2023
				</span>
			</div>
		</StyledFooter>
	);
}

export default Footer;
