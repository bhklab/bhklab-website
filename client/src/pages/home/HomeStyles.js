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

const StyledLabVideo = styled.div``;

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
		padding-top: 50px;

		/* critical containment */
		width: 100%;
		max-width: 100%;
		min-width: 0;
		overflow-x: hidden;
	}

	/* wrapper around the map component */
	.map-embed-shell {
		width: 100%;
		max-width: 100%;
		min-width: 0;
		overflow-x: hidden;
		position: relative;
	}

	/* direct child (your map component root) */
	.map-embed-shell > * {
		width: 100%;
		max-width: 100%;
		min-width: 0;
		overflow-x: hidden;
	}

	/* all descendants use border-box sizing (prevents width math surprises) */
	.map-embed-shell,
	.map-embed-shell * {
		box-sizing: border-box;
	}

	/* if any internal grid/flex child is stretching, this helps */
	.map-embed-shell .space-y-4,
	.map-embed-shell .min-w-0,
	.map-embed-shell .max-w-full {
		min-width: 0;
		max-width: 100%;
	}

	/* extra safety for SVG layout */
	.map-embed-shell svg {
		display: block;
		max-width: 100%;
	}

	.divider {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 0;
		max-width: 100%;
	}

	.home-publication-and-presentation-section {
		padding: 70px 0;
		min-width: 0;
		max-width: 100%;
		overflow-x: hidden;
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

export { Container, StyledImage, PMCRTImage, PMCRTTowerImage, TeamImage, BHKLabImage, StyledHome, StyledLabVideo };
