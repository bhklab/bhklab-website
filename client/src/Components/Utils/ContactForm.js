import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { StyledPIInfo, MarginBar } from './StyledUtils';

/**
 * A function to format text input fields and add a red start for mandatory inputs
 */
function StyledLabel(props) {
	const { title } = props;
	return (
		<div>
			<label>
				{title}
				<span style={{ color: 'red' }}>*</span>
			</label>
		</div>
	);
}

/**
 * A custom React component that returns a contact form to receive emails by a registered
 * email account on SendGrid
 * @example
 * <ContactFrom/>
 */
function ContactForm() {
	// States for contact form fields
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');

	//   Form validation state
	const [errors, setErrors] = useState({});

	// Setting success or failure messages states
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [showFailureMessage, setShowFailureMessage] = useState(false);

	// Validation check method
	const handleValidation = () => {
		const tempErrors = {};
		let isValid = true;

		if (fullName.length <= 0) {
			tempErrors.fullName = true;
			isValid = false;
		}
		if (email.length <= 0) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			tempErrors.email = emailRegex.test(email);
			isValid = emailRegex.test(email);
		}
		if (subject.length <= 0) {
			tempErrors.subject = true;
			isValid = false;
		}
		if (message.length <= 0) {
			tempErrors.message = true;
			isValid = false;
		}

		setErrors({ ...tempErrors });
		return isValid;
	};

	//   Handling form submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		const isValidForm = handleValidation();

		if (isValidForm) {
			const res = await fetch('api/mail/send', {
				body: JSON.stringify({
					email,
					fullName,
					subject,
					message,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});

			const { error } = await res.json();
			if (error) {
				setShowSuccessMessage(false);
				setShowFailureMessage(true);
				return;
			}
			// TODO: implement success and failure message
			setShowSuccessMessage(true);
			setShowFailureMessage(false);

			setEmail('');
			setFullName('');
			setSubject('');
			setMessage('');
		}
	};
	return (
		<main>
			<StyledPIInfo>
				<b>Benjamin Haibe-Kains, Ph.D.</b>
				Scientist, Princess Margaret Cancer Centre, University Health Network
				Assistant Professor, Department of Medical Biophysics, University of Toronto
			</StyledPIInfo>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'left',
				}}
				autoComplete="off"
			>
				<form onSubmit={handleSubmit}>
					<TextField
						id="outlined-basic"
						label={<StyledLabel title="Your Name" />}
						variant="outlined"
						value={fullName}
						onChange={(e) => {
							setFullName(e.target.value);
						}}
					/>
					<MarginBar />
					<TextField
						id="outlined-basic"
						label={<StyledLabel title="Email" />}
						variant="outlined"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<MarginBar />
					<TextField
						id="outlined-basic"
						label={<StyledLabel title="Subject" />}
						variant="outlined"
						value={subject}
						onChange={(e) => {
							setSubject(e.target.value);
						}}
					/>
					<MarginBar />
					<TextField
						sx={{ marginLeft: '5px', width: '200%' }}
						id="outlined-multiline-static"
						label={<StyledLabel title="Message" />}
						multiline
						variant="outlined"
						rows={4}
						fullWidth
						value={message}
						onChange={(e) => {
							setMessage(e.target.value);
						}}
					/>
					<MarginBar />
					<Button
						sx={{
							display: 'flex',
							justifyContent: 'left',
							marginLeft: '5px',
						}}
						variant="contained"
						type="submit"
						disabled={!(fullName.length && email.length && subject.length && message.length)}
					>
						Send
					</Button>
				</form>
			</Box>
		</main>
	);
}

export default ContactForm;
