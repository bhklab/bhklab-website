import React from 'react';
import styled from 'styled-components';
import { Dropdown } from 'primereact/dropdown';
import Box from '@mui/material/Box';
import colors from '../../styles/colors';

const Main = styled.div`
  background-color: ${colors.white_color};
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => (props.page.match(/home/ig) ? '' : '60px')};
  /* justify-content: space-between;
  height: 100vh; */
`;

const StyledDropdown = styled(Dropdown)`
  min-width: 200px;

  .pi {
    font-size: 0.7rem;
  }

  .p-dropdown-items .p-dropdown-item {
    color: ${colors.gray_text};
  }

  .p-dropdown-label,
  .p-dropdown-item {
    font-size: 12px;
  }
`;

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
  font-size: 0.9rem;
  margin: 20px 25px;
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
    height: 400px;
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

const StyledPIInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  height: 60px;
  line-spacing: 20px;
  margin-left: 5px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: normal;
  text-align: left;
`;

function MarginBar() {
	return <Box sx={{ height: 20 }} />;
}

export {
	Main,
	StyledDropdown,
	StyledCard,
	StyledResearchAxisCard,
	StyledImage,
	StyledTitle,
	StyledResearchAxisTitle,
	StyledDescription,
	StyledResearchAxisDescription,
	StyledPIInfo,
	MarginBar,
};
