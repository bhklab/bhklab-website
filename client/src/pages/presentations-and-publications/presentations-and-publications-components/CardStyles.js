import Card from '@mui/material/Card';
import styled from 'styled-components';
import colors from '../../../styles/colors';

// For the actually card padding around the text
const StyledCard = styled(Card)(() => ({
	'& .MuiCardContent-root': { padding: '8px' },
}));

const StyledAuthors = styled.div`
	font-weight: 500;
	color: ${colors.primary_text_color};
	font-size: 13px;
	@media screen and (max-width: 600px) {
		font-size: 11px;
	}
`;
const StyledTitle = styled.div`
	font-size: 18px;
	line-height: 1; 

	@media screen and (max-width: 600px) {
		font-size: 14px;
	}
`;
const StyledEvent = styled.div`
	font-size: 15px;
	font-weight: 600;
	margin-top: 1px;
	color: ${colors.primary_text_color};
	@media screen and (max-width: 600px) {
		font-size: 12px;
	}
`;
const StyledLocation = styled.div`
	font-size: 12px;
	color: ${colors.primary_text_color};
	@media screen and (max-width: 600px) {
		font-size: 10px;
	}
`;
const StyledDate = styled.div`
	font-size: 12px;
	color: ${colors.primary_text_light};
	margin: '3px 0';
	@media screen and (max-width: 600px) {
		font-size: 9px;
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
