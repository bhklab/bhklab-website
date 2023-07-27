import styled from 'styled-components';
import colors from './colors';

const StyledHeading = styled.div`
  width: 100%;
  display: flex;
  color: ${colors.primary_text_color};
  justify-content: center;
  height: 60px;
  margin-top: ${(props) => (props.noTopMargin ? '' : '20px')};
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;

export default StyledHeading;
