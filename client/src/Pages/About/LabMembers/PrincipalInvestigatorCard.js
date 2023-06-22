/* eslint-disable react/prop-types */
import styled from 'styled-components';
import React from 'react';
import colors from '../../../styles/colors';

export const StyledMember = styled.div`
	color: ${colors.primary_text_color};
	display: flex;
	flex-direction: row;
	background-color: ${colors.white_color};
	border-radius: 10px;
	margin: 20px 0 80px 0;

	img.principal-investigator-photo {
		width: 320px;
		height: 340px;
		object-fit: cover;
		border-radius: 10px;
		overflow: hidden;
		background-color: ${colors.white_color};
		box-shadow: 0px 0px 10px ${colors.card_shadow_color};
	}

	.principal-investigator-info {
		display: flex;
		flex-direction: column;
		line-height: 25px;
		padding: 0 10px;
		width: 90%;
		text-align: justify;
	}

	.principal-investigator-name {
		font-weight: bold;
		font-size: 1.4rem;
		display: flex;
		margin-bottom: 5px;
		
		span {
			margin-right: 5px;
		}

		img {
			height: 24px;
			width: 24px;
		}
	}

	.principal-investigator-title {
		font-style: italic;
		color: ${colors.primary_text_light};
		font-size: 1.1rem;
	}

	.principal-investigator-bio {
		margin-top: 30px;
		font-size: 1rem;
	}

	@media screen and (max-width: 500px) {
		flex-direction: column;

		.principal-investigator-info {
			width: 100%;
		}
	}
`;

function PrincipalInvestigatorCard({
	photo, name, title, bio,
}) {
	return (
		<StyledMember>
			<img className="principal-investigator-photo" src={photo} alt="" />
			<div className="principal-investigator-info">
				<div className="principal-investigator-name">
					<span>{name}</span>
					<a
						href="https://twitter.com/bhaibeka"
						target="_blank"
						rel="noreferrer"
					>
						<img src="/images/social-media/twitter.png" alt="twitter" />
					</a>
					<a
						href="https://www.linkedin.com/in/benhaibekains/"
						target="_blank"
						rel="noreferrer"
					>
						<img src="/images/social-media/linkedin.png" alt="linkedin" />
					</a>
				</div>
				<div className="principal-investigator-title">{title}</div>
				<div className="principal-investigator-bio">{bio}</div>
			</div>
		</StyledMember>
	);
}

export default PrincipalInvestigatorCard;
