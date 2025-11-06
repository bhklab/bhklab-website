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

const PI_BIO = `
	Dr. Benjamin Haibe-Kains is a Senior Scientist at the Princess Margaret Cancer Centre (PM), 
	University Health Network, and Professor in the Medical Biophysics Department of the University 
	of Toronto. Dr. Haibe-Kains earned his PhD in Bioinformatics at the Université Libre de Bruxelles 
	(Belgium). Supported by a Fulbright Award, he did his postdoctoral fellowship at the Dana-Farber 
	Cancer Institute and Harvard School of Public Health (USA). He is now the Canada Research Chair 
	in Computational Pharmacogenomics, the Scientific Director of the Cancer Digital Intelligence 
	Program at PM, and Head of Data Science of the Structural Genomics Concortium. Dr. Haibe-Kains’ 
	research focuses on integrating high-throughput data from various sources to jointly analyze multiple 
	facets of cancer progression and therapy response using machine learning and artificial intelligence 
	methods. Dr. Haibe-Kains’ team analyzes large-scale chemical, radiological and (pharmaco)genomic 
	datasets to develop new therapeutics, prognostic and predictive models to improve cancer care.
`;

// eslint-disable-next-line react/prop-types
function MemberHeadShot({
	title, description, imageUrl, item, linkedIn, twitter, email, bluesky,
}) {
	return (
		<StyledCard>
			<div style={{ height: '250px', width: '250px' }}>
				<StyledImage src={imageUrl} alt={title} PlaceholderSrc="./images/logo/bhklab-logo.png" />
			</div>
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
							<img src="/images/social-media/x-logo.jpg" alt="X" style={{ width: '25px', borderRadius: '5px', padding: '2px' }} />
						</a>
					)}
				{bluesky
					&& (bluesky.includes('http') ? (
						<a
							href={bluesky}
							target="_blank"
							rel="noreferrer"
						>
							<img src="/images/social-media/bluesky-icon.png" alt="bluesky" style={{ width: '25px', padding: '3px' }} />
						</a>
					) : (
						<a
							href={`https://bsky.app/profile/${bluesky.substring(1, bluesky.length)}`}
							target="_blank"
							rel="noreferrer"
						>
							<img src="/images/social-media/bluesky-icon.png" alt="bluesky" style={{ width: '25px', padding: '3px' }} />
						</a>
					))}
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
			imageUrl={`https://storage.googleapis.com/caboodle-images/member-photos/${item.image}?v=${new Date().getTime()}`}
			item={item}
			twitter={item.socials.twitter}
			linkedIn={item.socials.linkedIn}
			bluesky={item.socials.bluesky}
			email={item.preferredEmail}
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
		'Research Analyst': 13,
		'Software Developer': 14,
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
		Other: 27,
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
			setPeople(sortMembers(res.data));
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
												people.map((item, i) => (displayMember(item, i, (i !== people.length - 1))))
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
