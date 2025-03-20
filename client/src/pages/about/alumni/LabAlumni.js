/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import StyledHeading from '../../../styles/StyledHeading';
import {
	StyledAlumniCard,
	StyledImageAlumni,
	StyledName,
	StyledTitle,
	StyledIndustry,
	StyledPeople,
	StyledSocials,
} from '../lab-members/MembersOverviewStyles';
// import BasicModal from '../../../components/utils/AlumniModal';

// eslint-disable-next-line react/prop-types
function MemberHeadShot({
	title, currentPosition, company, industry, imageUrl, linkedIn,
}) {
	return (
		<StyledAlumniCard>
			<StyledImageAlumni src={imageUrl} alt={title} PlaceholderSrc="./images/logo/bhklab-logo.png" />
			<StyledName>{title}</StyledName>
			{industry
			&& (
				<StyledIndustry>
					{'Works in '}
					{industry}
				</StyledIndustry>
			)}
			{currentPosition
			&& (
				<StyledTitle>
					{currentPosition}
					{' at '}
					{company}
				</StyledTitle>
			)}
			{/* <BasicModal person={item} /> */}
			<StyledSocials>
				{linkedIn
				&& (
					<a
						href={linkedIn}
						target="_blank"
						rel="noreferrer"
					>
						<img
							src="/images/social-media/linkedin.png"
							alt="linkedin"
							style={{
								width: '25px',
								position: 'absolute',
								bottom: '15px',
								right: '107px',
							}}
						/>
					</a>
				)}
			</StyledSocials>
		</StyledAlumniCard>
	);
}

const displayMember = (item, index) => (
	<div key={index}>
		<MemberHeadShot
			currentPosition={item.currentPosition.title}
			company={item.currentPosition.company}
			industry={item.currentPosition.industry}
			title={item.name}
			imageUrl={item.image ? `https://storage.googleapis.com/caboodle-images/member-photos/${item.image}` : 'https://storage.googleapis.com/caboodle-images/member-photos/default_member.png'}
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
			const res = await axios.get('/api/data/alumni');
			setPeople(res.data.alumni);
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
														people.sort((a, b) => a.startAndEndYear - b.startAndEndYear),
													).map((item, i) => {
														if (item.currentPosition.company !== '') {
															if (i < itemsLoaded) {
																return displayMember(item, i, (i !== people.length - 1));
															}
															return null;
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
