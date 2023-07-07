import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledMissionContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 30px;
    text-wrap: balance;

    p {
        margin: 20px;
        color: ${colors.primary_text_light};
        text-align: center;
        font-size: 1.1rem;
        line-height: 1.6;
    }

    h2 {
        font-weight: 400;
    }
`;

const StyledMission = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .overall-mission-section {
        font-size: 1.1rem;
        text-align: center;

        @media only screen and (min-width: 768px) {
            max-width: 60%;
        }
    }

    .ways-to-achieve-mission-section {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    .ways-to-achieve-mission-section >
    .ways-to-achieve-mission-single-item {
        width: 300px;
        font-size: 1rem;
    }
`;

const StyledCulture = styled.div`
    /* margin: 30px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    @media only screen and (min-width: 768px) {
        max-width: 60%;
    }
`;

const StyledValues = styled.div`
    /* margin: 30px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    
    @media only screen and (min-width: 768px) {
        max-width: 60%;
    }
`;

export {
	StyledMissionContainer,
	StyledMission,
	StyledValues,
	StyledCulture,
};
