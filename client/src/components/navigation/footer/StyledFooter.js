import styled from 'styled-components';
import colors from '../../../styles/colors';

const StyledFooter = styled.footer`
	height: 300px;
	border-top: 1px solid ${colors.border_line_color};
	padding: 30px 80px;
	font-size: 0.9rem;
	margin-top: 100px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.all-links-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		width: 60%;
		gap: 20px;
	}

	.grouped-links-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.grouped-links-container a {
		color: ${colors.blue_footer};
		margin-bottom: 10px;
		text-decoration: none;
		transition: color 0.2s ease-in-out;
	}

	.grouped-links-container a:hover {
		color: ${colors.navbarLink};
	}

	.footer-social-media-links {
		color: ${colors.dark_gray};
		display: flex;
        justify-content: center;
        align-items: center;
		gap: 6px;

        img {
            max-width: 24px;
        }
	}

	@media only screen and (max-width: 750px) {
		padding: 20px;
	
		.all-links-container {
			width: 100%;
		}
	}

	@media only screen and (min-width: 2000px) {
		padding: 40px 20px;

		.twitter-feed-container > div {
			width: 500px;
		}

		.all-links-container {
			justify-content: space-evenly;
		}
		
		.grouped-links-container {
			gap: 7.5px;
		}
	}
`;

export default StyledFooter;
