/* eslint-disable react/prop-types */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import MemberInDetail from '../../pages/about/lab-members/MemberInDetail';
import colors from '../../styles/colors';

const boxStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 900,
	bgcolor: 'background.paper',
	'border-radius': '25px',
	'box-shadow': `0 0 10px 0 ${colors.card_shadow_color}`,
	p: 4,
};

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
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<Container>
			<Button sx={buttonStyle} onClick={handleOpen}>Learn More</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={boxStyle}>
					<MemberInDetail
						name={person.name}
						title={person.title}
						photo={`/images/people/${person.image}`}
						bio={person.bio}
					/>
				</Box>
			</Modal>
		</Container>
	);
}
