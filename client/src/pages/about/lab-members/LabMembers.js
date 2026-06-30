/* eslint-disable react/prop-types */

import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import StyledHeading from '../../../styles/StyledHeading';

import {
	StyledCard,
	StyledImage,
	StyledName,
	StyledTitle,
	StyledPeople,
	StyledSocials,
	StyledEmail,
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

const POSITION_ORDER = {
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

const normalizePosition = (position) => {
	return position?.trim().toLowerCase() ?? '';
};

const normalizeExternalUrl = (url) => {
	if (!url) {
		return '';
	}

	const trimmedUrl = url.trim();

	if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
		return trimmedUrl;
	}

	return `https://${trimmedUrl}`;
};

const getBlueskyUrl = (bluesky) => {
	if (!bluesky) {
		return '';
	}

	const value = bluesky.trim();

	if (value.startsWith('http://') || value.startsWith('https://')) {
		return value;
	}

	const handle = value.startsWith('@') ? value.substring(1) : value;

	return `https://bsky.app/profile/${handle}`;
};

const getMemberKey = (member, index) => {
	if (member?._id?.$oid) {
		return member._id.$oid;
	}

	if (typeof member?._id === 'string') {
		return member._id;
	}

	if (member?.slug) {
		return member.slug;
	}

	return `${member?.name ?? 'member'}-${index}`;
};

const sortMembers = (members) => {
	return [...members].sort((firstMember, secondMember) => {
		const firstPositionOrder = POSITION_ORDER[firstMember.position] ?? Number.MAX_SAFE_INTEGER;

		const secondPositionOrder = POSITION_ORDER[secondMember.position] ?? Number.MAX_SAFE_INTEGER;

		if (firstPositionOrder !== secondPositionOrder) {
			return firstPositionOrder - secondPositionOrder;
		}

		return (firstMember.name ?? '').localeCompare(secondMember.name ?? '');
	});
};

const extractPositions = (members) => {
	const uniquePositions = [...new Set(members.map((member) => member.position?.trim()).filter(Boolean))];

	return uniquePositions.sort((firstPosition, secondPosition) => {
		const firstPositionOrder = POSITION_ORDER[firstPosition] ?? Number.MAX_SAFE_INTEGER;

		const secondPositionOrder = POSITION_ORDER[secondPosition] ?? Number.MAX_SAFE_INTEGER;

		if (firstPositionOrder !== secondPositionOrder) {
			return firstPositionOrder - secondPositionOrder;
		}

		return firstPosition.localeCompare(secondPosition);
	});
};

function MemberHeadShot({ title, description, imageUrl, item, linkedIn, twitter, email, bluesky }) {
	const twitterUrl = normalizeExternalUrl(twitter);
	const linkedInUrl = normalizeExternalUrl(linkedIn);
	const blueskyUrl = getBlueskyUrl(bluesky);

	return (
		<StyledCard>
			<div style={{ height: '250px', width: '250px' }}>
				<StyledImage src={imageUrl} alt={title} PlaceholderSrc="/images/logo/bhklab-logo.png" />
			</div>

			<StyledName>{title}</StyledName>

			<StyledTitle>{description}</StyledTitle>

			<BasicModal person={item} />

			<StyledSocials>
				{twitterUrl && (
					<a href={twitterUrl} target="_blank" rel="noreferrer">
						<img
							src="/images/social-media/x.png"
							alt="X"
							style={{
								maxWidth: '20px',
								borderRadius: '5px',
							}}
						/>
					</a>
				)}

				{blueskyUrl && (
					<a href={blueskyUrl} target="_blank" rel="noreferrer">
						<img
							src="/images/social-media/bluesky-icon.png"
							alt="Bluesky"
							style={{
								maxWidth: '20px',
								borderRadius: '5px',
							}}
						/>
					</a>
				)}

				{linkedInUrl && (
					<a href={linkedInUrl} target="_blank" rel="noreferrer">
						<img
							src="/images/social-media/linkedin-icon.png"
							alt="LinkedIn"
							style={{
								maxWidth: '20px',
								borderRadius: '5px',
							}}
						/>
					</a>
				)}
			</StyledSocials>

			{email && <StyledEmail>{email.toLowerCase()}</StyledEmail>}
		</StyledCard>
	);
}

const displayMember = (item, index) => {
	const imageUrl = item.image
		? `https://storage.googleapis.com/caboodle-images/member-photos/${item.image}`
		: '/images/logo/bhklab-logo.png';

	return (
		<div key={getMemberKey(item, index)}>
			<MemberHeadShot
				description={item.position}
				title={item.name}
				imageUrl={imageUrl}
				item={item}
				twitter={item.socials?.twitter}
				linkedIn={item.socials?.linkedIn}
				bluesky={item.socials?.bluesky}
				email={item.preferredEmail}
			/>
		</div>
	);
};

function LabMembers() {
	const [people, setPeople] = useState([]);
	const [selectedPosition, setSelectedPosition] = useState('all');
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		let isMounted = true;

		const getPeople = async () => {
			try {
				setIsLoading(true);
				setError('');

				const response = await axios.get('/api/data/members');

				if (!isMounted) {
					return;
				}

				const members = Array.isArray(response.data) ? response.data : [];

				setPeople(sortMembers(members));
			} catch (requestError) {
				console.error('Unable to retrieve lab members:', requestError);

				if (isMounted) {
					setError('Unable to load lab members.');
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		getPeople();

		return () => {
			isMounted = false;
		};
	}, []);

	const positions = useMemo(() => {
		return extractPositions(people);
	}, [people]);

	const currentPeople = useMemo(() => {
		if (selectedPosition === 'all') {
			return people;
		}

		const normalizedSelectedPosition = normalizePosition(selectedPosition);

		return people.filter((person) => {
			return normalizePosition(person.position) === normalizedSelectedPosition;
		});
	}, [people, selectedPosition]);

	const handlePositionChange = (event) => {
		setSelectedPosition(event.target.value);
	};

	if (isLoading) {
		return (
			<Container fixed>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						minHeight: '300px',
					}}
				>
					<CircularProgress />
				</Box>
			</Container>
		);
	}

	if (error) {
		return (
			<Container fixed>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						minHeight: '300px',
					}}
				>
					<Typography color="error">{error}</Typography>
				</Box>
			</Container>
		);
	}

	return (
		<Container fixed>
			<PiInDetail
				name="Benjamin Haibe-Kains"
				title="Principal Investigator"
				photo="https://storage.googleapis.com/caboodle-images/member-photos/bhk.jpg"
				bio={PI_BIO}
			/>

			<StyledHeading>Current Members</StyledHeading>

			<Box
				sx={{
					width: 280,
					paddingBottom: 5,
					marginLeft: '40px',
				}}
			>
				<FormControl fullWidth>
					<InputLabel id="members-position-select-label">Position</InputLabel>

					<Select
						labelId="members-position-select-label"
						id="members-position-select"
						value={selectedPosition}
						label="Position"
						onChange={handlePositionChange}
					>
						<MenuItem value="all">All positions</MenuItem>

						{positions.map((position) => (
							<MenuItem key={position} value={position}>
								{position}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>

			{currentPeople.length > 0 ? (
				<StyledPeople>{currentPeople.map((member, index) => displayMember(member, index))}</StyledPeople>
			) : (
				<Typography
					sx={{
						marginLeft: '40px',
						paddingBottom: 5,
					}}
				>
					No members were found for this position.
				</Typography>
			)}
		</Container>
	);
}

export default LabMembers;
