/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import StyledHeading from '../../../styles/StyledHeading';
import {
	StyledCard, StyledImage, StyledName, StyledTitle, StyledPeople, StyledSocials,
} from '../lab-members/MembersOverviewStyles';
import BasicModal from '../../../components/utils/Modal';

// eslint-disable-next-line react/prop-types
function MemberHeadShot({
	title, description, imageUrl, item, linkedIn, twitter,
}) {
	return (
		<StyledCard>
			<StyledImage src={imageUrl} alt={title} PlaceholderSrc="./images/Logo/bhklab-logo.png" />
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
		</StyledCard>
	);
}

// cunrrently: links to a new page and display the member
const displayMember = (item, index) => item.image && (
	<div key={index}>
		<MemberHeadShot
			description={item.position}
			title={item.name}
			imageUrl={`/images/peopleV2/${item.image}`}
			item={item}
			twitter={item.twitter}
			linkedIn={item.linkedIn}
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
	const [itemsLoaded, setItemsLoaded] = useState(12);
	const [itemsButton, setItemsButton] = useState('show more');

	// Adding or removing the number of items shown in alumni list + changing what the button says
	const adjustItems = () => {
		if (itemsLoaded === 12) {
			setItemsLoaded(people.length);
			setItemsButton('show less');
		} else {
			setItemsLoaded(12);
			setItemsButton('show more');
		}
	};

	useEffect(() => {
		const getPeople = async () => {
			const res = await axios.get('/api/data/members');
			setPeople(res.data.members);
			setLoadingState(true);
		};
		getPeople();
	}, [itemsLoaded]);

	return (
		<Container sx={{ textAlign: 'center' }}>
			{
				isLoading
						&& (
							<>
								<StyledHeading>
									Alumni
								</StyledHeading>
								<StyledPeople>
									{
										people.length && (
											<>
												{
													sortMembers(
														people.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)),
													).map((item, i) => {
														if (i < itemsLoaded) {
															return displayMember(item, i, (i !== people.length - 1));
														}
														return null;
													})
												}
											</>
										)
									}
								</StyledPeople>
							</>
						)
			}
			<Button
				disableElevation
				disableRipple
				sx={{
					width: '60px',
					margin: '15px 0 0 0',
					fontSize: '0.63em',
					padding: '0px',
					'&.MuiButtonBase-root:hover': {	bgcolor: 'transparent' },
					height: '20px',
				}}
				onClick={() => adjustItems()}
			>
				{itemsButton}
			</Button>
		</Container>
	);
}

export default LabMembers;
