import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { ResearchCard } from '../../Components/Utils/CustomCard';
import slugGeneratorHelper from '../../Components/Utils/slugGeneratorHelper';
import { StyledSection } from '../../styles/StyledPage';

function ResearchTopics() {
	const [ready, setReady] = useState(false);
	const [researches, setResearches] = useState({});
	useEffect(() => {
		window.scrollTo(0, 0);
		const getDataset = async () => {
			const res = await axios.get('/api/data/researches');
			setResearches(res.data.research);
		};
		getDataset().then(() => { setReady(true); });
	}, []);

	return (
		<StyledSection>
			<h1>Research Teams</h1>
			<div className="container">
				{
					ready
					&& researches.map((item, index) => (
						<ResearchCard
							key={index}
							title={item.teamTitle}
							description={item.teams.map((team, indx) => (
								<div key={indx} style={{ display: 'flex', justifyContent: 'left', marginBottom: '10px' }}>
									<ArrowRightIcon fontSize="15" />
									<a href={team.url || `./research/${slugGeneratorHelper(team.teamTitle)}`}>
										{team.teamTitle}
									</a>
								</div>
							))}
							image={item.image}
						/>
					))
				}
			</div>
		</StyledSection>
	);
}

export default ResearchTopics;
