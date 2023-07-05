/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import AdminTool from './AdminTools';
import AuthContext from '../../hooks/Contexts';
import {
	StyledCard,
	StyledResearchAxisCard,
	StyledImage,
	StyledTitle,
	StyledResearchAxisTitle,
	StyledDescription,
	StyledResearchAxisDescription,
} from './UtilStyles';

/**
 * A custom React component that returns customized cards
 *
 * @param {Object} path, item that is an object including: _id, teamTitle, description, image
 * @returns {JSX.Element} A customized card including image, title, description,
 * and a link to individual research page
 *
 * @example
 * <ResearchAxisCard
 * 	path = "linkToResearchPage"
 * 	title = "Title"
 * 	description= "description" image="src"
 * />
 */
export function ResearchAxisCard(props) {
	const {
		title, description, image, path,
	} = props;

	return (
		<StyledResearchAxisCard>
			<a href={path}>
				<StyledImage src={image || '/images/research/research.png'} alt={title} />
				<StyledResearchAxisTitle>{title}</StyledResearchAxisTitle>
			</a>
			<StyledResearchAxisDescription>{description}</StyledResearchAxisDescription>
		</StyledResearchAxisCard>
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
