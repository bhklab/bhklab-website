import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import colors from '../../../styles/colors';
import StyledHeading from '../../../styles/StyledHeading';
import MemberCard from './MemberComponents/MemberCard';
// import AuthContext from '../../../hooks/Contexts';

const StyledCard = styled.div`
  width: 245px;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${colors.main};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const StyledImage = styled.img`
  width: 245px;
  height: 240px;
  object-fit: cover;
`;

const StyledName = styled.h2`
  font-size: 14px;
  font-weight: normal;
  margin: 10px 10px;
  text-align: center;
`;

const StyledTitle = styled.p`
  font-size: 12px;
  font-style: italic;
  color: ${colors.gray_footer};
  margin: 10px 10px;
  text-align: center;
`;

const StyledPeople = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  word-wrap: break-word;
  gap: 40px 30px;

  .pi-photo {
	border-radius: 2px;
	width: 300px;
	height: auto;
	object-fit: cover;
  }
`;

// eslint-disable-next-line react/prop-types
function MemberHeadShot({ title, description, imageUrl }) {
	return (
		<StyledCard>
			<StyledImage src={imageUrl} alt={title} PlaceholderSrc="./images/Logo/bhklab-logo.png" />
			<StyledName>{title}</StyledName>
			<StyledTitle>{description}</StyledTitle>
		</StyledCard>
	);
}

const member = (item, index) => (
	<div key={index}>
		<Link to={{
			pathname: `/people/${item.slug}`,
			param: { member: item },
		}}
		>
			<MemberHeadShot
				description={item.position}
				title={item.name}
				imageUrl={`/images/people/${item.image}`}
			/>
		</Link>
	</div>
);

const sortMembers = (people) => {
	const order = {
		'Postdoctoral Fellow': 0,
		'Postdoctoral Research Fellow': 1,
		'Visiting Postdoctoral Fellow': 2,
		'Collaborative Scientific Associate': 3,
		'Scientific Associate': 4,
		'Research Associate': 5,
		'PhD Student': 6,
		'Visiting PhD Student': 7,
		'MSc Student': 8,
		'Medical Oncology Fellow': 9,
		'Project Manager': 10,
		'Project Manager/Research Associate': 10,
		'Project Coordinator': 11,
		'Program Coordinator (CBMP)': 12,
		'Software Developer': 13,
		'Research Analyst': 14,
		'Bioinformatics Analyst': 15,
		'Research Student': 16,
		'Undergraduate Student': 17,
		'Rotation Student': 18,
		'Visiting Student': 19,
		'Research Intern': 20,
		'Research Student Intern': 21,
		'Undergrad Research Intern': 21,
		Intern: 22,
		'Co-op Student': 22,
		'Summer Student': 23,
		'Undergraduate Summer Student': 23,
		'Research Trainee': 24,
		'Research Volunteer': 25,
		Volunteer: 26,
	};
	const result = people.sort((a, b) => (order[a.position] - order[b.position]));
	return result;
};

function People() {
	// const { admin } = useContext(AuthContext);
	const [ready, setReady] = useState(false);
	const [people, setPeople] = useState({});
	const history = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
		const getPeople = async () => {
			const res = await axios.get('/api/data/members');
			setPeople(res.data.members.filter((item) => item.display));
			setReady(true);
		};
		getPeople();
	}, []);

	useEffect(() => (() => {
		if (history.action === 'POP' && history.location.pathname === '/') {
			console.log('history');
			history.replace({
				pathname: '/',
				state: {
				},
			});
		}
	}), [history]);

	return (
		<Container fixed>
			{
				ready
						&& (
							<>
								<MemberCard
									name="Benjamin Haibe-Kains"
									title="Principal Investigator"
									photo="/images/people/bhk.jpg"
									bio="Trained as a computer scientist, Dr. Benjamin Haibe-Kains earned his PhD in Bioinformatics at the Université Libre de Bruxelles (Belgium).
										He was a postdoc in the Quackenbush group at the Dana-farber Cancer Institute and Harvard School of Public Health (USA).
										Dr. Haibe-Kains started his own laboratory at the Institut de Recherches Cliniques de Montréal (Canada) and
										he is now Principal Investigator at the Princess Margaret Cancer Centre. His research focuses on the integration
										of high-throughput data from various sources to simultaneously analyze multiple facets of diseases,
										with a particular emphasis on cancer. Dr. Haibe-Kains and his team are using publicly available genomic datasets and
										data generated through his collaborations to better understand the biology underlying carcinogenesis and to develop
										new predictive models in order to significantly improve disease management. Dr. Haibe-Kains' main scientific contributions
										include several prognostic gene signatures in breast cancer, subtype classification models for ovarian and breast cancers, as well as genomic predictors of drug response in cancer cell lines."
								/>
								<StyledHeading>
									Current Members
								</StyledHeading>
								<StyledPeople>
									{
										people.length
									&& (
										<>
											{ sortMembers(people.filter((item) => item.status === 'current member').sort((a, b) => new Date(a.startDate) - new Date(b.startDate))).map((item, i) => (member(item, i, (i !== people.length - 1))))}
										</>
									)
									}
								</StyledPeople>
								{/* <StyledHeading>Alumni</StyledHeading>
								<StyledPeople>
									{
										people.length
									&& (
										<>
											{ sortMembers(people.filter((item) => item.status === 'alumni')
												.sort((a, b) => new Date(b.endDate) - new Date(a.endDate)))
												.map((item, i) => (member(item, i)))}
										</>
									)
									}
								</StyledPeople> */}
							</>
						)
			}
		</Container>
	);
}

export default People;
