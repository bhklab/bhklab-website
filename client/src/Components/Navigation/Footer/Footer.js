import { Link } from 'react-router-dom';
import styled from 'styled-components';
import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import colors from '../../../styles/colors';

const StyledFooter = styled.div`
	border-top: 1px solid ${colors.border_line_color};
	padding: 20px;
	font-size: 0.9rem;
	margin-top: 100px;

	.footer-links-and-twitter-container {
		display: flex;
	}

	.all-links-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		width: 60%;
	}

	.twitter-feed-container {
		width: 40%;
		display: flex;
		justify-content: center;
	}

	.twitter-feed-container > div {
		width: 400px;
		height: 250px;
		display: flex;
		justify-content: center;
	}

	.grouped-links-container {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.grouped-links-container a {
		color: ${colors.blue_footer};
		margin-bottom: 10px;
		text-decoration: none;
		transition: color 0.2s ease-in-out;
	}

	.grouped-links-container a:hover {
		color: ${colors.navbarLink};
	}

	.footer-info {
		text-align: center;
		margin-top: 30px;
		margin-bottom: 10px;
	}

	.footer-info p {
		color: ${colors.blue_footer};
	}

	@media only screen and (min-width: 2000px) {
		padding: 40px 20px;

		.twitter-feed-container > div {
			width: 500px;
		}

		.all-links-container {
			justify-content: space-evenly;
		}
		
		.grouped-links-container {
			gap: 7.5px;
		}
	}
`;

function Footer() {
	return (
		<StyledFooter className="footer-container">
			<footer className="footer-links-and-twitter-container">
				<div className="all-links-container">
					<div className="grouped-links-container">
						<a href="/research"> Research </a>
						<a href="/people"> People </a>
						<a href="/collaboration"> Collaboration </a>
					</div>
					<div className="grouped-links-container">
						<a href="/publications"> Publications </a>
						<a href="/presentations"> Presentations </a>
						<a href="/software"> Software </a>
					</div>
					<div className="grouped-links-container">
						<a href="/resources"> Resources </a>
						<a href="/datasets"> Datasets </a>
						<a href="https://www.pmgenomics.ca/bhklab/"> Github </a>
					</div>
					<div className="grouped-links-container">
						<Link to="/contact"> Contact Us </Link>
						<Link to="/positions"> Join Us </Link>
					</div>
				</div>
				<div className="twitter-feed-container">
					<TwitterTimelineEmbed
						sourceType="profile"
						screenName="bhklab"
						options={{ width: 500, height: 250 }}
						// tweetLimit={5}
					/>
				</div>
			</footer>
			<div className="footer-info">
				<p style={{ fontWeight: 'lighter' }}>
					BHKLab © 2023
				</p>
			</div>
		</StyledFooter>
	);
}

export default Footer;
