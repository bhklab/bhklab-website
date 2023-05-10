/* eslint-disable react/prop-types */
import styled from 'styled-components';
import React, { useContext } from 'react';
import colors from '../../styles/colors';
import AdminTool from './AdminTools';
import AuthContext from '../../hooks/Contexts';

/**
 * Style components
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
 * A custom React component that returns customized cards
 *
 * @param {Object} path, item that is an object including: _id, teamTitle, description, image
 * @returns {JSX.Element} A customized card including image, title, description,
 * and a link to individual research page
 *
 * @example
 * <ResearchCard
 * 	path = "linkToResearchPage"
 * 	title = "Title"
 * 	description= "description" image="src"
 * />
 */
export function ResearchCard(props) {
	const {
		title, description, image, path,
	} = props;

	return (
		<StyledCard>
			<a href={path}>
				<StyledImage src={image || '/images/research/research.png'} alt={title} />
				<StyledTitle>{title}</StyledTitle>
			</a>
			<StyledDescription>{description}</StyledDescription>
		</StyledCard>
	);
}

export function TeamCard(props) {
	const { admin } = useContext(AuthContext);
	const { path, item } = props;
	const {
		_id, teamTitle, description, image,
	} = item;

	return (
		<StyledCard>
			{admin && <AdminTool id={_id} collection="researches" item={item} />}
			<a href={path}>
				<StyledImage src={image || '/images/research/research.png'} alt={teamTitle} />
				<StyledTitle>{teamTitle}</StyledTitle>
			</a>
			<StyledDescription>{description}</StyledDescription>
		</StyledCard>
	);
}
