import { Link } from 'react-router-dom';
import React from 'react';
import StyledFooter from './FooterStyle';

function Footer() {
	return (
		<StyledFooter className="footer-container">
			<footer className="footer-links-and-twitter-container">
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
			</footer>
			<div className="footer-info">
				<a
					href="https://github.com/bhklab"
					target="_blank"
					rel="noreferrer"
				>
					<img src="/images/social-media/github.png" alt="github" />
				</a>
				<a
					href="https://twitter.com/bhklab"
					target="_blank"
					rel="noreferrer"
				>
					<img src="/images/social-media/twitter.png" alt="twitter" />
				</a>
				<a
					href="https://www.linkedin.com/in/bhklab/"
					target="_blank"
					rel="noreferrer"
				>
					<img src="/images/social-media/linkedin.png" alt="linkedin" />
				</a>
				<span className="footer-text">
					BHKLab © 2023
				</span>
			</div>
		</StyledFooter>
	);
}

export default Footer;
