import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ResearchAxisCard } from '../../components/utils/CustomCard';
import slugGeneratorHelper from '../../utils/slugGeneratorHelper';
import { StyledSection } from '../../styles/StyledPage';

function ResearchAxis() {
	const [isLoading, setIsisLoadingState] = useState(true);
	const [researchTeams, setResearchTeams] = useState({});

	useEffect(() => {
		window.scrollTo(0, 0);

		const getDataset = async () => {
			const res = await axios.get('/api/data/researches');
			setResearchTeams(res.data.research);
		};

		getDataset()
			.then(() => setIsisLoadingState(false));
	}, []);

	return (
		<StyledSection>
			<h1> Research Axis </h1>
			<div className="container">
				{
					!isLoading
					&& researchTeams.map((item) => (
						<ResearchAxisCard
							key={`${item.title}`}
							title={item.title}
							description={(
								<ul>
									{
										item.teams.map((team) => (
											<div key={`${team.teamTitle}`}>
												<li>
													<a href={team.url || `./research/${slugGeneratorHelper(team.teamTitle)}`}>
														{team.teamTitle}
													</a>
												</li>
											</div>
										))
									}
								</ul>
							)}
							image={item.image}
						/>
					))
				}
			</div>
		</StyledSection>
	);
}

export default ResearchAxis;
