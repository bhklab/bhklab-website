import styled from 'styled-components';
import React, {useContext} from 'react';
import colors from '../../styles/colors';
import {AdminTool} from './AdminTools';
import {AuthContext} from '../../hooks/Contexts';

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
 * @param {Object} path, item that is an object including: _id, teamTitle, description, image
 * @returns {JSX.Element} A customized card including image, title, description, and a link to individual research page
 *
 * @example
 * <ResearchCard path = "linkToResearchPage" title = "Title" description= "description" image="src"/>
 */
export const ResearchCard = (props) => {
	const { title, description, image, path} = props;

	return (
		<StyledCard>
			<a href={path}>
				<StyledImage src={image || '/images/research/research.png'} alt={title} />
				<StyledTitle>{title}</StyledTitle>
			</a>
			<StyledDescription>{description}</StyledDescription>
		</StyledCard>
	);
};


export const TeamCard = (props) => {
	const { admin } = useContext(AuthContext);
	const { path, item} = props;
	const {_id, teamTitle, description, image} = item;

	return (
		<StyledCard>
			{admin && <AdminTool id={_id} collection={'researches'} item={item}/>}
			<a href={path}>
				<StyledImage src={image || '/images/research/research.png'} alt={teamTitle} />
				<StyledTitle>{teamTitle}</StyledTitle>
			</a>
			<StyledDescription>{description}</StyledDescription>
		</StyledCard>
	);
};
