import styled from 'styled-components';

const Container = styled.div`
	video {
		width: 100%;
		height: auto;
  		/* height: calc(100vh - 70px);	 */
		/* object-fit: cover; */
		filter: brightness(0.6);
	}

	display: flex;
	flex-direction: column;
	
	.twitter-timeline-container {
		align-self: flex-end;
		margin-right: 100px;
	}
`;

const StyledLabVideo = styled.div`
	
`;

const StyledImage = styled.div`
    height: 400px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
	background-attachment: fixed;

	@media screen and (max-width: 800px) {
		background-attachment: scroll !important;
	}
`;

const StyledHome = styled.div`
	.home-component-sub-section {
		padding-top: 70px;
	}

	.home-component-sub-section > hr {
		margin: auto;
	}
	
	.home-publication-and-presentation-section {
		padding-top: 70px;
		/* height: 900px; */
	}

	hr {
		margin: 20px 0;
	}
`;

const PMCRTImage = styled(StyledImage)`
    background-image: url('images/parallax-photos/equations.jpg');
`;

const PMCRTTowerImage = styled(StyledImage)`
    background-image: url('images/parallax-photos/books.jpg');
`;

const BHKLabImage = styled(StyledImage)`
	background-image: url('images/parallax-photos/coding(3).jpg');
`;

const TeamImage = styled(StyledImage)`
    background-image: url('images/social/team_pic.jpg');
`;

export {
	Container,
	StyledImage,
	PMCRTImage,
	PMCRTTowerImage,
	TeamImage,
	BHKLabImage,
	StyledHome,
	StyledLabVideo,
};
