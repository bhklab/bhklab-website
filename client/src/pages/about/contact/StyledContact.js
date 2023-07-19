import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import colors from '../../../styles/colors';

const MapFrame = styled.iframe`
  width: 100%;
  height: 600px;
  border: 0;
`;

const StyledEmail = styled.a`
  width: fit-content;
  display: flex;
  align-Papers: center;
  flex-direction: row;
  white-space: nowrap;
  border-radius: 3.5px;
  color: ${colors.link_color};
`;

const StyledContent = styled.div`
  width: 100%;
  display: flex;
  line-height: 20px;
  font-weight: 600;
  font-size: 13px;
  flex-direction: column;
  color: ${colors.primary_text_color};
  .icons {
    flex-direction: row;
  }
`;

const StyledIcons = styled.div`
  width: 100%;
  display: flex;
  line-height: 20px;
  flex-direction: row;
  justify-content: center;
`;

/**
 * A styled component for items on the page
* */
const Box = styled(Paper)(() => ({
	backgroundColor: '#fff',
	padding: '20px',
	marginBottom: '20px',
	textAlign: 'center',
}));

export {
	StyledIcons,
	StyledContent,
	StyledEmail,
	MapFrame,
	Box,
};
