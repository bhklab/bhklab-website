/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import MemberInDetail from '../../pages/about/lab-members/MemberInDetail';
import colors from '../../styles/colors';

const BoxStyle = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 900px;
	bgcolor: background.paper;
	border-radius: 25px;
	padding: 0;

	@media screen and (max-width: 1200px) {
		box-shadow: 0 0 4px 0 ${colors.card_shadow_color};
		width: 600px;
	}

	@media screen and (max-width: 768px) {
		width: 350px;
	}


`;

const buttonStyle = {
	'&.MuiButtonBase-root:hover': {	bgcolor: 'transparent' },
	color: '#1e88e5',
	fontSize: '0.7rem',
};

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 0 5px ${colors.card_shadow_color},
`;

export default function BasicModal({ person }) {
	const [open, setOpen] = useState(false);

	return (
		<Container>
			{/* <Button sx={buttonStyle} onClick={() => setOpen(true)}>Learn More</Button> */}
			<a href={`/people/${person.slug}`}>
				<Button sx={buttonStyle}>Learn More</Button>
			</a>

			<Modal
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<BoxStyle>
					<MemberInDetail
						name={person.name}
						title={person.title}
						photo={`https://storage.googleapis.com/caboodle-images/member-photos/${person.image}`}
						bio={person.bio}
					/>
				</BoxStyle>
			</Modal>
		</Container>
	);
}
