import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Layout from '../../Components/Utils/Layout';
import 'animate.css/animate.min.css';
import colors from '../../styles/colors';
import { TeamCard } from '../../Components/Utils/CustomCard';
import slugGeneratorHelper from '../../Components/Utils/slugGeneratorHelper';

const StyledSection = styled.div`
  padding-top: 60px;
  h1 {
	font-size: 14px;
	font-weight: bold;
	margin-bottom: 30px;
	color: #000000;
	text-align: center;
  }

  .container {
	margin: 50px;
	flex-direction: row;
	align-items: center;
	flex-wrap: wrap;
	display: flex;
	justify-content: center;
  .inner {
	display: flex;
	flex-flow: row wrap;
	justify-content: flex-start;
  }
  }

  .box {
	background-color: white;
	flex-basis: 22%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	//align-items: center;
	text-align: center;
	padding: 10px 5px 10px 5px;
	margin: 10px 30px;
	min-height: 120px;
	border-radius: 5px;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.3);
	line-height: 120%;

	.title {
	  font-weight: bold;
	  font-size: 12px;
	  height: 40px;
	  color: ${colors.navbarLink};
	}

	.description {
	  height: 150px;
	  
	  ul {
		display: flex;
		flex-direction: column;
		justify-content: left;
		text-align: left;
	  }
	}

	a {
	  color: #2A2A2AFF;
	  transition: 0.3s;
	  font-weight: 400;
	  cursor: pointer;
	  display: flex;
	  justify-content: center;
	  flex-direction: column;
	  align-items: center;
	  text-align: center;
	  padding: 10px 5px;
	}


	a:hover {
	  transition: 0.3s;
	}

	& img {
	  height: 45px;
	  max-width: 60px;
	}

	& span {
	  margin-top: 20px;
	  font-size: 12px;
	  font-weight: normal;
	  color: #575757;
	}

	& a:hover {
	  color: #d5d5d5;
	}
  }
`;

function Research() {
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
		<Layout>
			<StyledSection>
				{
					ready
				&& researches.map((research, index) => (
					<div key={index}>
						<h1>{research.title}</h1>
						<div className="container">
							{
								research.teams.map((team, indx) => (
									<TeamCard
										key={indx}
										path={`research/${team.url || slugGeneratorHelper(team.teamTitle)}`}
										item={team}
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
