import styled from 'styled-components';
import colors from '../../../styles/colors';

const StyledMemberDetailed = styled.div`
	color: ${colors.primary_text_color};
	display: flex;
	flex-direction: row;
	background-color: ${colors.white_color};
	border-radius: 10px;
	margin: 0 0 0 0;

	@media screen and (max-width: 500px) {
		flex-direction: column;

		.principal-investigator-info {
			width: 100%;
		}
	}
	@media screen and (max-width: 1200px) {
		flex-direction: column;
		justify-content: center;
		align-items: center;

		margin: 20px 0 80px 0;
	}
`;

const StyledInfoDetailed = styled.div`
	display: flex;
	flex-direction: column;
	line-height: 25px;
	padding: 0 10px;
	width: 90%;
	text-align: justify;
	@media screen and (max-width: 1200px) {
		width: 100%;
		justify-content: center;
		align-items: center;
	}
`;

const StyledImageDetailed = styled.img`
		width: 320px;
		height: 340px;
		object-fit: cover;
		border-radius: 10px;
		overflow: hidden;
		background-color: ${colors.white_color};
		box-shadow: 0px 0px 10px ${colors.card_shadow_color};

		@media screen and (max-width: 1200px) {
			margin-top: 10px;
		}

		@media screen and (max-width: 768px) {
			width: 120px;
			height: 140px;
		}
`;

const StyledPiImageDetailed = styled.img`
		width: 320px;
		height: 340px;
		object-fit: cover;
		border-radius: 10px;
		overflow: hidden;
		background-color: ${colors.white_color};
		box-shadow: 0px 0px 10px ${colors.card_shadow_color};

		@media screen and (max-width: 1200px) {
			margin-top: 10px;
			width: 280px;
			height: 300px;
		}
		@media screen and (max-width: 1200px) {
			width: 240px;
			height: 260px;
		}


`;

const StyledNameDetailed = styled.h2`
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
	@media screen and (max-width: 1200px) {
		margin-top: 20px;
		font-size: 1.2rem;
	}

	@media screen and (max-width: 768px) {
		font-size: 0.8em;
	}
`;

const StyledTitleDetailed = styled.p`
	font-style: italic;
	color: ${colors.primary_text_light};
	font-size: 1.1rem;
	@media screen and (max-width: 768px) {
		font-size: 0.6em
	}
`;

const StyledBioDetailed = styled.div`
	margin-top: 30px;
	font-size: 1rem;
	@media screen and (max-width: 1200px) {
		margin-top: 10px;
	}
	@media screen and (max-width: 1200px) {
		font-size: 0.8em;
	}
	@media screen and (max-width: 768px) {
		font-size: 0.6em;
	}
`;

export {
	StyledMemberDetailed,
	StyledInfoDetailed,
	StyledImageDetailed,
	StyledNameDetailed,
	StyledTitleDetailed,
	StyledBioDetailed,
	StyledPiImageDetailed,
};
