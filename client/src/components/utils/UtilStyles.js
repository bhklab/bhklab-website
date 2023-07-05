import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import colors from '../../styles/colors';

/*
*** Layout.js
*/
const Main = styled.div`
	background-color: ${colors.white_color};
	display: flex;
	flex-direction: column;
	row-gap: ${(props) => (props.page.match(/home/ig) ? '' : '60px')};
	/* justify-content: space-between;
	height: 100vh; */
`;

/*
*** CustomDropdown.js
*/
const StyledDropdown = styled(Dropdown)`
    min-width: 200px;
    .pi {
        font-size: 0.7rem;
    }
    .p-dropdown-items .p-dropdown-item {
        color: ${colors.gray_text};
    }
    .p-dropdown-label, .p-dropdown-item {
        font-size: 12px;
    }
`;

/*
*** CustomCard.js
*/
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
  height: 100px;
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

/**
 * styles for research axis card
 */
const StyledResearchAxisCard = styled(StyledCard)`
  width: 400px;
  height: 450px;
  padding: 20px 7.5px;

  @media screen and (min-width: 1700px) {
    width: 500px;
    height: 400px;
  }
`;

const StyledResearchAxisTitle = styled(StyledTitle)`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 15px 0;
  text-wrap: balance;
`;

const StyledResearchAxisDescription = styled(StyledDescription)`
  color: ${colors.primary_text_light};
`;

/**
 *** ContactForm.js
 *
 * Styles for PI information at the top of form
 */
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

/**
 * A function to create margin between input fields
 */

function MarginBar() {
	return (
		<Box
			sx={{
				height: 20,
			}}
		/>
	);
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
