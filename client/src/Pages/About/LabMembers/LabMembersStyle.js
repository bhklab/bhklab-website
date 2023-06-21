import styled from 'styled-components';
import colors from '../../../styles/colors';

const StyledCard = styled.div`
  width: 245px;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${colors.main};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const StyledImage = styled.img`
  width: 245px;
  height: 240px;
  object-fit: cover;
`;

const StyledName = styled.h2`
  font-size: 14px;
  font-weight: normal;
  margin: 10px 10px;
  text-align: center;
`;

const StyledTitle = styled.p`
  font-size: 12px;
  font-style: italic;
  color: ${colors.gray_footer};
  margin: 10px 10px;
  text-align: center;
`;

const StyledPeople = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  word-wrap: break-word;
  gap: 40px 30px;

  .pi-photo {
	border-radius: 2px;
	width: 300px;
	height: auto;
	object-fit: cover;
  }
`;

export {
	StyledCard,
	StyledImage,
	StyledName,
	StyledTitle,
	StyledPeople,
};
