import Card from '@mui/material/Card';
import styled from 'styled-components';

// For the actually card padding around the text
const StyledCard = styled(Card)(() => ({
	'& .MuiCardContent-root': { padding: '12px' },
}));

const StyledAuthors = styled.div`
	font-weight: 500 ;
	margin: 5px 0 0 0;
`;

export { StyledCard, StyledAuthors };
