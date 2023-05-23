import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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

    h1 {
        font-size: 2.2rem;
    }
`;

const StyledVision = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px;
`;

const StyledStrategicPriorities = styled.div`
    margin: 30px;
`;

const StyledCulture = styled.div`
    margin: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledOrganizationPillar = styled.div`
    margin: 30px;
`;

export {
	StyledSection,
	StyledVision,
	StyledStrategicPriorities,
	StyledCulture,
	StyledOrganizationPillar,
};
