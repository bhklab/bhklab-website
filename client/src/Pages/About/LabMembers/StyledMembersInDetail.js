import styled from 'styled-components';
import colors from '../../../styles/colors';

const StyledMemberDetailed = styled.div`
	color: ${colors.primary_text_color};
	display: flex;
	flex-direction: row;
	background-color: ${colors.white_color};
	border-radius: 10px;
	margin: 150px 0 80px 0;

	@media screen and (max-width: 500px) {
		flex-direction: column;

		.principal-investigator-info {
			width: 100%;
		}
	}
`;

const StyledInfoDetailed = styled.div`
	display: flex;
	flex-direction: column;
	line-height: 25px;
	padding: 0 10px;
	width: 90%;
	text-align: justify;
`;

const StyledImageDetailed = styled.img`
		width: 320px;
		height: 340px;
		object-fit: cover;
		border-radius: 10px;
		overflow: hidden;
		background-color: ${colors.white_color};
		box-shadow: 0px 0px 10px ${colors.card_shadow_color};
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
`;

const StyledTitleDetailed = styled.p`
	font-style: italic;
	color: ${colors.primary_text_light};
	font-size: 1.1rem;
`;

const StyledBioDetailed = styled.div`
	margin-top: 30px;
	font-size: 1rem;
`;

export {
	StyledMemberDetailed,
	StyledInfoDetailed,
	StyledImageDetailed,
	StyledNameDetailed,
	StyledTitleDetailed,
	StyledBioDetailed,
};
