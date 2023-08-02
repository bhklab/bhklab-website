import styled from 'styled-components';

const DisplayContainer = styled.div`
	display: flex;
	align-items: center;
	@media screen and (max-width: 650px){
		flex-direction: column;
	}
`;

export default DisplayContainer;
