import Card from '@mui/material/Card';
import styled from 'styled-components';
import colors from '../../../styles/colors';

// Padding the card
const StyledCard = styled(Card)(() => ({
	'& .MuiCardContent-root': { padding: '8px' },
}));

const StyledAuthors = styled.div`
	font-weight: 500;
	color: ${colors.primary_text_color};
	font-size: 13px;
	margin-bottom: 2px;

	@media screen and (max-width: 1200px) {
		font-size: 11px;
	}
	@media screen and (max-width: 700px) {
		font-size: 9px;
	}
`;
const StyledTitle = styled.div`
	font-size: 16px;
	line-height: 1; 
	margin-bottom: 5px;

	@media screen and (max-width: 1200px) {
		font-size: 14px;
	}
	@media screen and (max-width: 700px) {
		font-size: 12px;
	}
`;
const StyledEvent = styled.div`
	font-size: 15px;
	margin-bottom: 2px;
	color: ${colors.primary_text_color};
	@media screen and (max-width: 1200px) {
		font-size: 13px;
	}
	@media screen and (max-width: 700px) {
		font-size: 12px;
	}
`;
const StyledLocation = styled.div`
	font-size: 12px;
	margin-bottom: 2px;
	color: ${colors.primary_text_color};
	@media screen and (max-width: 1200px) {
		font-size: 11px;
	}
	@media screen and (max-width: 700px) {
		font-size: 11px;
	}
`;
const StyledDate = styled.div`
	font-size: 12px;
	color: ${colors.primary_text_light};
	margin: '3px 0';
	@media screen and (max-width: 1200px) {
		font-size: 10px;
	}
	@media screen and (max-width: 700px) {
		font-size: 10px;
	}
`;

export {
	StyledCard,
	StyledAuthors,
	StyledTitle,
	StyledEvent,
	StyledLocation,
	StyledDate,
};
