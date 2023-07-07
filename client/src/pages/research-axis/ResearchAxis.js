import React from 'react';
import { StyledSection } from '../../styles/StyledPage';
import researchAxisDescription from './ResearchAxisDescription';
import { ResearchAxisCard } from '../../components/utils/custom-cards/CustomCards';

function ResearchAxis() {
	return (
		<StyledSection>
			<h1> Research Axis </h1>
			<div className="container">
				{
					Object.entries(researchAxisDescription).map(([key, value]) => (
						<ResearchAxisCard
							key={`${key}`}
							title={`${value['research-axis']}`}
							description={`${value.description}`}
							image={`${value.imagePath}`}
						/>
					))
				}
			</div>
		</StyledSection>
	);
}

export default ResearchAxis;
