import styled from 'styled-components';
import React from 'react';
import Container from '@mui/material/Container';
import colors from '../../../styles/colors';

const StyledFooter = styled.div`
  background-color: ${colors.white};
  padding: 40px 20px;
  margin: 0px 50px;
  font-size: 14px;
  .links {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 40px;
  }

  .link-container {
    display: flex;
    flex-direction: column;
  }

  .link-container a {
    color: ${colors.blue_footer};
    margin-bottom: 10px;
    text-decoration: none;
    transition: color 0.2s ease-in-out;
  }

  .link-container a:hover {
    color: ${colors.navbarLink};
  }

  .footer-info {
    text-align: center;
  }

  .footer-info p {
    color: ${colors.blue_footer};
    margin-bottom: 10px;
  }
`;

function Footer() {
	return (
		<Container>
			<StyledFooter>
				<div className="links">
					<div className="link-container">
						<a href="/research">Research</a>
						<a href="/people">People</a>
						<a href="/collaboration">Collaboration</a>

					</div>

					<div className="link-container">
						<a href="/publications">Publications</a>
						<a href="/presentations">Presentations</a>
						<a href="/software">Software</a>
					</div>

					<div className="link-container">
						<a href="/resources">Resources</a>
						<a href="/datasets">Datasets</a>
						<a href="https://www.pmgenomics.ca/bhklab/">Github</a>
						<a href="https://cbioportal.ca">cBioPortal</a>

					</div>

					<div className="link-container">
						<a href="/contact">Contact Us</a>
						<a href="/positions">Join Us</a>

					</div>
				</div>

				<div className="footer-info">
					<p style={{ fontWeight: 'lighter' }}>BHKLab © 2023</p>
				</div>
			</StyledFooter>
		</Container>
	);
}

export default Footer;
