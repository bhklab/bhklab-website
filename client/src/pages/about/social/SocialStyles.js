import styled from 'styled-components';

const StyledSocial = styled.div`
	width: 80%;
	.subject {
		color: red;
		display: flex;
		align-items: center;
		height: 60px;
		font-size: 14px;
		font-weight: normal;
		margin-top: 30px;
	}
	.date {
		color: darkred;
		display: flex;
		align-items: center;
		height: 30px;
		font-size: 12px;
		font-weight: normal;
	}
	.content {
		font-size: 15px;
		line-height: 25px;
		font-weight: normal;
		width: 75%;
		color: mediumvioletred;
	}
	.divider {
		margin-bottom: 30px;
		padding-top: 10px;
	}
`;

const Container = styled.div`
	width: 80%;
	margin: 0px 20px;
	display: flex;
	flex-direction: column;
`;

const SocialMediaAccountWrapper = styled.div`
	margin-top: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	gap: 50px;

	.bsky-wrapper {
		max-width: 325px;
		max-height: 750px;
	}
`;

export { Container, StyledSocial, SocialMediaAccountWrapper };
