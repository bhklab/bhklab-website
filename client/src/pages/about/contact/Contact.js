import React from 'react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import ContactForm from '../../../components/utils/contact-form/ContactForm';
import {
	StyledIcons, StyledContent, StyledEmail, MapFrame, Box,
} from './StyledContact';
import Layout from '../../../components/utils/Layout';
import StyledHeading from '../../../styles/StyledHeading';

function Contact() {
	return (
		<Layout>
			<Container id="contact" sx={{ marginTop: '100px' }}>
				<StyledHeading>Contact Us</StyledHeading>
				<Grid container spacing={1} sx={{ marginBottom: '10px', flexGrow: 1 }}>
					<Grid item lg={12} container spacing={2}>
						<Grid item lg={12}>
							<Box style={{ display: 'flex', justifyContent: 'left' }}>
								<Grid container columnSpacing={1}>
									<ContactForm />
								</Grid>
							</Box>
						</Grid>
						<Grid item lg={6}>
							<Box id="category-a" sx={{ fontSize: '12px', textTransform: 'uppercase' }}>
								<StyledContent>
									Soleil Miron, Administrative Assistant
									{' '}
									<br />
									Phone: +1 (416) 581-7628
									<br />
									<div style={{
										display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
									}}
									>
										<StyledEmail href={`mailto:${'smiron@uhnresearch.ca'}`}>
											{/* <MdOutlineMailOutline size={18} /> */}
											Send a message
											<br />
										</StyledEmail>
									</div>
								</StyledContent>
							</Box>
						</Grid>
						<Grid item lg={6}>
							<Box id="category-b" sx={{ fontSize: '12px', textTransform: 'uppercase' }}>
								<StyledContent>
									The MaRS Center, TMDT room 11-310
									<br />
									101 College Street,
									<br />
									Toronto, ON,
									<br />
									M5G 1L7, Canada
									<br />
								</StyledContent>
								<StyledIcons>
									<Grid item>
										<a href="https://www.youtube.com/@bhklab2945">
											<YouTubeIcon style={{ color: 'gray', fontSize: '30px', padding: '5px' }} />
										</a>
									</Grid>
									<Grid item>
										<a href="https://www.twitter.com/bhklab">
											<TwitterIcon style={{ color: 'gray', fontSize: '30px', padding: '5px' }} />
										</a>
									</Grid>
									<Grid item>
										<a href="https://www.linkedin.com/in/bhklab/">
											<LinkedInIcon style={{ color: 'gray', fontSize: '30px', padding: '5px' }} />
										</a>
									</Grid>
								</StyledIcons>
							</Box>
						</Grid>
					</Grid>
				</Grid>
			</Container>
			<Container>
				<MapFrame
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.43444669756!2d-79.39085344846093!3d43.65993365990993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34b632b77689%3A0x901c210dff19e5a4!2s101%20College%20St%2C%20Toronto%2C%20ON%20M5G%201L7!5e0!3m2!1sen!2sca!4v1581544280286!5m2!1sen!2sca"
				/>
			</Container>
		</Layout>
	);
}

export default Contact;
