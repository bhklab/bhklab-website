import styled from 'styled-components';
import colors from '../../../styles/colors';

const StyledPositionCard = styled.div`
  width: 80%;
  padding: 20px 30px 10px 30px;
  margin: 20px 10px;
  display: flex;
  flex-direction: column;
  text-align: left;
  line-height: 25px;
  background-color: ${colors.card_bg};
  color: ${colors.card_text};
  border-color: ${colors.card_bg};
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.3);

  .title {
	color: ${colors.card_text};
	font-size: 14px;
	font-weight: bold;
  }

  .subtitle {
	margin: 15px 0px 10px 0px;
	color: ${colors.card_text};
	font-size: 12px;
	font-weight: bold;
  }

  a {
	color: ${colors.header_deep_blue};
  }

  .icon {
	font-size : 14px;
	display: flex;
  }

  .divider {
	padding-top: 1px;
  }

  :hover {
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.3);
  }
`;

export default StyledPositionCard;
