import styled from 'styled-components';
import colors from '../../../styles/colors';

const StyledMember = styled.div`
    color: ${colors.primary_text_color};
	display: flex;
	flex-direction: row;
	background-color: ${colors.white_color};
	border-radius: 10px;
	margin: 20px 0 80px 0;
`;

const StyledCard = styled.div`
    width: 245px;
    height: 395px;
    border-radius: 10px;
    overflow: hidden;
    background-color: ${colors.main};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const StyledAlumniCard = styled.div`
    width: 245px;
    height: 400px;
    border-radius: 10px;
    overflow: hidden;
    background-color: ${colors.main};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    position: relative;
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100%;
    object-position: center;
`;

const StyledImageAlumni = styled.img`
    width: 245px;
    height: 240px;
    object-fit: cover;

`;

const StyledName = styled.h2`
    font-size: 15px;
    font-weight: semi-bold;
    margin: 10px 10px;
    text-align: center;
`;

const StyledTitle = styled.p`
    font-size: 12px;
    font-style: italic;
    color: gray;
    margin: 5px 10px 0 10px;
    text-align: center;
`;

const StyledIndustry = styled.p`
    font-size: 11px;
    color: ${colors.primary_text_color};
    margin: 5px 10px 0 10px;
    text-align: center;
`;

const StyledSocials = styled.div`
    display: flex;
    justify-content: center;
	align-items: center;
	gap: 4px;
`;

const StyledEmail = styled.p`
    font-size: 12px;
    color: ${colors.primary_text_color};
    margin: 5px 10px 0 10px;
    text-align: center;
`;

const StyledPeople = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    word-wrap: break-word;
    gap: 40px 30px;

    .pi-photo {
	    border-radius: 2px;
	    width: 300px;
	    height: auto;
        object-fit: cover;
    }
`;

export {
	StyledMember, StyledCard, StyledImage, StyledName, StyledTitle,
	StyledPeople, StyledSocials, StyledAlumniCard, StyledIndustry, StyledEmail,
	StyledImageAlumni,
};
