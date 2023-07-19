import Card from '@mui/material/Card';
import styled from 'styled-components';

// For the actually card padding around the text
const StyledCard = styled(Card)(() => ({
	'& .MuiCardContent-root': { padding: '8px' },
}));

const StyledAuthors = styled.div`
	font-weight: 500;
`;

export { StyledCard, StyledAuthors };
