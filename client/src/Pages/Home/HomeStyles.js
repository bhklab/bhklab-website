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

const PMCRTImage = styled(StyledImage)`
    background-image: url('images/pmcrt1.jpg');
`;

export {
	Container,
	StyledImage,
	PMCRTImage,
};
