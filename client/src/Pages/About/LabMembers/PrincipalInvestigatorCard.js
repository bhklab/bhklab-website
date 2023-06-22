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
	margin-top: 20px;

	img {
		width: 320px;
		height: 360px;
		object-fit: cover;
		border-radius: 10px;
		overflow: hidden;
		background-color: ${colors.white_color};
		box-shadow: 0px 0px 10px ${colors.card_shadow_color};
	}

	.LabMember-info {
		display: flex;
		flex-direction: column;
		line-height: 25px;
		padding: 0 10px;
		width: 90%;
		text-align: justify;
	}

	.LabMember-name {
		font-weight: bold;
		margin-bottom: 10px;
		font-size: 1.4rem;
	}

	.LabMember-title {
		font-style: italic;
		color: ${colors.primary_text_light};
		font-size: 1.1rem;
	}

	.LabMember-bio {
		margin-top: 30px;
		font-size: 1rem;
	}

	@media screen and (max-width: 500px) {
		flex-direction: column;

		.LabMember-info {
			width: 100%;
		}
	}
`;

function PrincipalInvestigatorCard({
	photo, name, title, bio,
}) {
	return (
		<StyledMember>
			<img className="pi-photo" src={photo} alt="" />
			<div className="LabMember-info">
				<div className="LabMember-name">{name}</div>
				<div className="LabMember-title">{title}</div>
				<div className="LabMember-bio">{bio}</div>
			</div>
		</StyledMember>
	);
}

export default PrincipalInvestigatorCard;
