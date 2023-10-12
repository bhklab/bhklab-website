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
    margin-bottom: 30px;

    p.overall-mission-content-section {
        @media only screen and (min-width: 768px) {
            max-width: 60%;
        }
    }

	.highlight-keywords{
		font-weight: 700;
		color: ${colors.dark_gray};
	}

    .ways-to-achieve-mission-section {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 30px;
    }

    .ways-to-achieve-mission-single-item {
        width: 325px;
        padding: 20px 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
        box-shadow: 0 0 4px ${colors.card_shadow_color};
        
        p {
            font-size: 1rem;
        }

        :first-of-type, :last-of-type {
            /* height: 250px; */
        }

        @media only screen and (max-width: 1100px) {
            height: 300px !important;
        }

		@media only screen and (max-width: 768px) {
			padding: 30px 10px;
        }

        img {
            width: 75px;
            height: 75px;
        }
    }
`;

const StyledCulture = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media only screen and (min-width: 768px) {
        max-width: 60%;
    }
`;

const StyledCoreValues = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .core-values-heading {
        font-weight: 500;
    }

    .core-values-list {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 30px;
		margin-top: 30px;
    
        p {
            font-size: 1rem;
			margin: 0;
        }
    }

    .core-values-single-list-item {
        width: 300px;
        height: 270px;
        padding: 25px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        border-radius: 10px;
        box-shadow: 0 0 4px ${colors.card_shadow_color};

        img {
            width: 75px;
            height: 75px;
        }

        h4 {
            color: ${colors.primary_text_color};
        }

        p {
            min-height: 100px;
            max-height: 100px;
            width: 90%;
        }

		@media only screen and (max-width: 768px) {
			p{
				margin: 0;
				height: 240px;
			}
        }
    }
`;

export {
	StyledMissionContainer,
	StyledMission,
	StyledCoreValues,
	StyledCulture,
};
