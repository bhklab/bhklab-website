import styled from 'styled-components';
import colors from '../../../styles/colors';

const StyledMemberDetailed = styled.div`
	color: ${colors.primary_text_color};
	display: flex;
	flex-direction: row;
	background-color: ${colors.white_color};
	border-radius: 10px;
	padding: 20px 20px;

	@media screen and (max-width: 1200px) {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0px 30px;
	}

	.social-container{
		display: flex;
		justify-content: start;
		gap: 4px;
	}
`;

const StyledPiDetailed = styled.div`
	color: ${colors.primary_text_color};
	display: flex;
	flex-direction: row;
	background-color: ${colors.white_color};
	border-radius: 10px;
	padding: 80px 30px;

	@media screen and (max-width: 900px) {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0px;
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

const StyledPiInfoDetailed = styled.div`
	display: flex;
	flex-direction: column;
	line-height: 25px;
	padding: 0 10px;
	width: 90%;
	text-align: justify;

	@media screen and (max-width: 900px) {
		justify-content: center;
		align-items: center;
	}
`;

const StyledImageDetailed = styled.img`
		width: 450px;
		object-fit: cover;
		border-radius: 10px;
		overflow: hidden;
		background-color: ${colors.white_color};
		box-shadow: 0px 0px 10px ${colors.card_shadow_color};

		@media screen and (max-width: 1200px) {
			margin-top: 10px;
			width: 260px;
			height: 280px;
		}
		@media screen and (max-width: 768px) {
			width: 160px;
			height: 180px;
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

		@media screen and (max-width: 900px) {
			width: 260px;
			height: 280px;

		}
`;

const StyledNameDetailed = styled.h2`
	font-weight: bold;
	font-size: 2rem;
	display: flex;
	margin-bottom: 5px;

	span {
		margin-right: 5px;
	}
	@media screen and (max-width: 1200px) {
		margin-top: 20px;
		font-size: 1.2rem;
		margin-bottom: 0px;

	}

	@media screen and (max-width: 768px) {
		font-size: 0.8em;
	}
`;

const StyledEmailDetailed = styled.h2`
	font-weight: bold;
	font-size: 1.4rem;
	display: flex;

	span {
		margin-right: 5px;
	}
	@media screen and (max-width: 1200px) {
		margin-top: 5px;
		font-size: 1.2rem;
	}

	@media screen and (max-width: 768px) {
		font-size: 0.8em;
	}
`;

const StyledPiNameDetailed = styled.h2`
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
		font-size: 1em;
	}

	.social-container{
		display: flex;
		justify-content: center;
		gap: 4px;
	}
`;

const StyledTitleDetailed = styled.p`
	font-style: italic;
	color: ${colors.primary_text_light};
	font-size: 1.1rem;
	margin-bottom: 5px;

	@media screen and (max-width: 1200px) {
		font-size: 1rem;
	}

	@media screen and (max-width: 768px) {
		font-size: 0.9em;
	}
`;

const StyledBioDetailed = styled.div`
	margin-top: 20px;
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
	StyledPiDetailed,
	StyledPiInfoDetailed,
	StyledPiNameDetailed,
	StyledEmailDetailed,
};
