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

const StyledImage = styled.div`
    min-height: 500px;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
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
		height: 800px;
		@media only screen and (max-width: 1200px) {
			height: 1000px
		}
		@media only screen and (max-width: 768px) {
			height: 1200px
		}
		@media only screen and (max-width: 640px) {
			height: 1500px
		}
	}
`;

const PMCRTImage = styled(StyledImage)`
    background-image: url('images/software/layout-bg.png');
`;

const PMCRTTowerImage = styled(StyledImage)`
    background-image: url('images/software/layout-bg.png');
`;

const TeamImage = styled(StyledImage)`
    background-image: url('images/social/team_pic.jpg');
`;

const BHKLabImage = styled(StyledImage)`
	background-color: #8d99ae;
	background-image: url('images/software/layout-bg.png');
`;

export {
	Container,
	StyledImage,
	PMCRTImage,
	PMCRTTowerImage,
	TeamImage,
	BHKLabImage,
	StyledHome,
};
