import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/utils/Layout';
import { Container, Heading, Form, FormGroup, Label, Input, Button, Message } from './UpdateStyles';

const SocialsUpdate = () => {
	const [socials, setSocials] = useState({
		twitter: '',
		linkedin: '',
		bluesky: '',
	});
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'password') {
			setPassword(value);
		} else {
			setSocials((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage('');

		try {
			await axios.post('/api/data/socialsUpdate', { ...socials, password });
			setMessage('Social media links updated successfully!');
			setSocials({ twitter: '', linkedin: '', bluesky: '' });
			setPassword('');
		} catch (error) {
			if (error.response?.status === 401) {
				setMessage('Incorrect password. Please try again.');
			} else if (error.response?.data?.message) {
				setMessage(error.response.data.message);
			} else {
				setMessage('Error updating social media links.');
			}
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Layout page="admin-socials-update">
			<Container>
				<Heading>Update Social Media Links</Heading>
				<Form onSubmit={handleSubmit}>
					{Object.keys(socials).map((platform) => (
						<FormGroup key={platform}>
							<Label htmlFor={platform}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</Label>
							<Input
								type="url"
								id={platform}
								name={platform}
								value={socials[platform]}
								onChange={handleChange}
								placeholder={`Enter ${platform} URL`}
							/>
						</FormGroup>
					))}
					<FormGroup>
						<Label htmlFor="password">Password *</Label>
						<Input
							type="password"
							id="password"
							name="password"
							value={password}
							onChange={handleChange}
							placeholder="Enter password"
							required
						/>
					</FormGroup>
					<Button type="submit" disabled={loading}>
						{loading ? 'Updating...' : 'Update Links'}
					</Button>
				</Form>
				{message && <Message className={message.includes('successfully') ? 'success' : 'error'}>{message}</Message>}
			</Container>
		</Layout>
	);
};

export default SocialsUpdate;
