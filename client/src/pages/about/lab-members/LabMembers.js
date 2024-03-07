/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from '@mui/material/Container';
import StyledHeading from '../../../styles/StyledHeading';
import {
	StyledCard, StyledImage, StyledName, StyledTitle, StyledPeople, StyledSocials, StyledEmail,
} from './MembersOverviewStyles';
import BasicModal from '../../../components/utils/Modal';
import PiInDetail from './PiInDetail';
// import AuthContext from '../../../hooks/Contexts';

const PI_BIO = `
	Trained as a computer scientist, Dr. Benjamin Haibe-Kains earned his PhD in Bioinformatics 
	at the Université Libre de Bruxelles (Belgium). He was a postdoc in the Quackenbush group at the 
	Dana-farber Cancer Institute and Harvard School of Public Health (USA). 
	Dr. Haibe-Kains started his own laboratory at the Institut de Recherches Cliniques de Montréal (Canada) 
	and he is now Principal Investigator at the Princess Margaret Cancer Centre. 
	His research focuses on the integration of high-throughput data from 
	various sources to simultaneously analyze multiple facets of diseases, 
	with a particular emphasis on cancer. 
	Dr. Haibe-Kains and his team are using publicly available genomic datasets and data generated 
	through his collaborations to better understand the biology underlying carcinogenesis 
	and to develop new predictive models in order to significantly improve disease management. 
	Dr. Haibe-Kains' main scientific contributions include several prognostic gene signatures 
	in breast cancer, subtype classification models for ovarian and breast cancers, 
	as well as genomic predictors of drug response in cancer cell lines.
`;

// eslint-disable-next-line react/prop-types
function MemberHeadShot({
	title, description, imageUrl, item, linkedIn, twitter, email,
}) {
	return (
		<StyledCard>
			<StyledImage src={imageUrl} alt={title} PlaceholderSrc="./images/logo/bhklab-logo.png" />
			<StyledName>{title}</StyledName>
			<StyledTitle>{description}</StyledTitle>
			<BasicModal person={item} />
			<StyledSocials>
				{twitter
				&& (
					<a
						href={twitter}
						target="_blank"
						rel="noreferrer"
					>
						<img src="/images/social-media/twitter.png" alt="twitter" style={{ width: '25px' }} />
					</a>
				)}
				{linkedIn
				&& (
					<a
						href={linkedIn}
						target="_blank"
						rel="noreferrer"
					>
						<img src="/images/social-media/linkedin.png" alt="linkedin" style={{ width: '25px' }} />
					</a>
				)}
			</StyledSocials>
			<StyledEmail>
				{email.toLowerCase()}
			</StyledEmail>
		</StyledCard>
	);
}

// cunrrently: links to a new page and display the member
const displayMember = (item, index) => (
	<div key={index}>
		<MemberHeadShot
			description={item.position}
			title={item.name}
			imageUrl={`https://storage.googleapis.com/caboodle-images/member-photos/${item.image}`}
			item={item}
			twitter={item.twitter}
			linkedIn={item.linkedIn}
			email={item.contactInfo.preferredEmail}
		/>
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

function LabMembers() {
	// const { admin } = useContext(AuthContext);
	const [isLoading, setLoadingState] = useState(false);
	const [people, setPeople] = useState({});
	const history = useNavigate();

	useEffect(() => {
		const getPeople = async () => {
			const res = await axios.get('/api/data/members');
			setPeople(res.data.members);
			setLoadingState(true);
		};
		getPeople();
	}, []);

	useEffect(() => (() => {
		if (history.action === 'POP' && history.location.pathname === '/') {
			// console.log(history);
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
				isLoading
						&& (
							<>
								<PiInDetail
									name="Benjamin Haibe-Kains"
									title="Principal Investigator"
									photo="https://storage.googleapis.com/caboodle-images/member-photos/bhk.jpg"
									bio={PI_BIO}
								/>
								<StyledHeading>
									Current Members
								</StyledHeading>
								<StyledPeople>
									{
										people.length
									&& (
										<>
											{
												sortMembers(
													people.sort((a, b) => new Date(a.startYear) - new Date(b.startYear)),
												).map((item, i) => (displayMember(item, i, (i !== people.length - 1))))
											}
										</>
									)
									}
								</StyledPeople>
							</>
						)
			}
		</Container>
	);
}

export default LabMembers;
