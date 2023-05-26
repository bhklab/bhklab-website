import styled from 'styled-components';
import colors from './colors';

const SlideButton = styled.div`
  height : 60px;
  display: flex;
  flex-direction: column;
  align-self: center;
  color: ${(props) => (props.isActive ? colors.dark_gray : colors.light_gray)};
`;

export default SlideButton;
