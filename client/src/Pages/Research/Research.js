import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../Components/Utils/Layout';
import 'animate.css/animate.min.css';
import { TeamCard } from '../../Components/Utils/CustomCard';
import slugGeneratorHelper from '../../utils/slugGeneratorHelper';
import { StyledSection } from '../../styles/StyledPage';

function Research() {
	const [isLoading, setIsLoadingState] = useState(true);
	const [researchTeams, setResearchTeamsState] = useState({});
	useEffect(() => {
		window.scrollTo(0, 0);

		const getDataset = async () => {
			const res = await axios.get('/api/data/researches');
			setResearchTeamsState(res.data.research);
		};

		getDataset()
			.then(() => { setIsLoadingState(false); });
	}, []);

	return (
		<Layout>
			<StyledSection>
				{
					!isLoading
					&& researchTeams.map((researchTeam) => (
						<div key={`${researchTeam.title}`}>
							<h1>{researchTeam.title}</h1>
							<div className="container">
								{
									researchTeam.teams.map((project) => (
										<TeamCard
											key={project.teamTitle}
											path={`research/${project.url || slugGeneratorHelper(project.teamTitle)}`}
											item={project}
										/>
									))
								}
							</div>
						</div>
					))
				}
			</StyledSection>
		</Layout>
	);
}

export default Research;
