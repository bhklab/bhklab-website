import styled from "styled-components";
import React from "react";
import colors from "../../styles/colors";

/**
 * Style components
 */
const StyledCard = styled.div`
  width: 210px;
  height: 280px;
  border-radius: 5px;
  margin: 5px;
  background-color: white;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: contain;
`;

const StyledTitle = styled.h2`
  font-size: 12px;
  font-weight: bold;
  margin: 10px 20px;
  color: ${colors.navbarLink};
  text-align: center;
`;

const StyledDescription = styled.div`
  font-size: 14px;
  margin: 10px 20px;
  text-align: center;
`;

/**
 * A custom React component that returns customized cards
 *
 * @param {Object} path, title, description, image
 * @returns {JSX.Element} A customized card including image, title, description, and a link to individual research page
 *
 * @example
 * <ResearchCard path = "linkToResearchPage" title = "Title" description= "description" image="src"/>
 */
export const ResearchCard = ({ title, description, image}) => {
    return (
        <StyledCard>
            <StyledImage src={image || "/images/research/research.png"} alt={title} />
            <StyledTitle>{title}</StyledTitle>
            <StyledDescription>{description}</StyledDescription>
        </StyledCard>
    );
};
