import styled from 'styled-components';
import colors from '../../../styles/colors';

const StyledCard = styled.div`
  width: 250px;
  height: 300px;
  border-radius: 5px;
  margin: 10px;
  padding: 15px;
  background-color: white;
  overflow: hidden;
  box-shadow: 0px 0px 10px ${colors.card_shadow_color};
`;

const StyledImage = styled.img`
  width: 100%;
  height: 85px;
  /* width: 75px; */
  object-fit: contain;
`;

const StyledTitle = styled.div`
  font-size: 0.9rem;
  margin: 10px 0;
  color: ${colors.primary_text_color};
  text-align: center;
`;

const StyledDescription = styled.div`
  font-size: 0.90rem;
  margin: 20px 25px;

  @media screen and (min-width: 1700px) {
    font-size: 0.95rem;
  }
`;

const StyledResearchAxisCard = styled(StyledCard)`
  width: 420px;
  height: 400px;
  padding: 20px 0;
  border-radius: 10px;
  box-shadow: 0px 0px 5px ${colors.card_shadow_color};
  text-align: justify;

  @media screen and (min-width: 1700px) {
    width: 500px;
    height: 420px;
  }
`;

const StyledResearchAxisTitle = styled(StyledTitle)`
  font-size: 1.15rem;
  font-weight: 700;
  margin: 15px 0;
  text-wrap: balance;
`;

const StyledResearchAxisDescription = styled(StyledDescription)`
  color: ${colors.primary_text_light};
`;

export {
	StyledCard,
	StyledResearchAxisCard,
	StyledImage,
	StyledTitle,
	StyledResearchAxisTitle,
	StyledDescription,
	StyledResearchAxisDescription,
};
