import styled from 'styled-components';
import colors from '../../styles/colors';

const WebAppsAndPackagesContainerStyles = styled.div`
  width: 100%;
  /* text-wrap: balance; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  hr {
    margin: 50px 0;
  }
`;

const WebAppsAndPackagesStyles = styled.div`
  .web-apps-container, 
  .packages-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .single-app-container, 
  .single-package-container {
    text-align: center;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* flex-grow: 1; */
    flex-basis: 25%;
  }

  .single-package-container {
    height: 200px;
  }

  .app-section, 
  .package-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 350px;
    height: inherit;
    padding: 15px;
    gap: 15px;
  }

  .app-section-description, 
  .package-section-description {
    font-size: 0.9rem;
    color: ${colors.primary_text_color};
    font-weight: 400;
  }

  .app-section:hover,
  .package-section:hover {
    border-radius: 20px;
    box-shadow: 0 0 4px ${colors.card_shadow_color};
  }

  /*  WEB APPS SPECIFIC STYLES */
  .component-heading-web-apps {
    text-align: center;
    line-height: 40px;
    margin-bottom: 50px;
  }

  img.logo {
    width: calc(3vw + 6rem);
    opacity: 1;
    transition: linear 0.2s;
  }

  .app-section-description-github {
    margin-top: 10px;
  }

  /* PACKAGE SPECIFIC STYLES */
  .component-heading-packages {
    text-align: center;
    line-height: 40px;
    margin-bottom: 50px;
  }

  .package-title {
    border-radius: 15px;
    color: ${colors.white_color};
    background: ${colors.primary_text_color};
    width: 210px;
    padding: 15px 20px;
    font-weight: 700;
    font-size: calc(0.6vw + 0.8em);
    transition: linear 0.2s;
  }

  .package-title:hover {
    background: transparent;
    color: ${colors.primary_text_color};
    border: 1px solid ${colors.primary_text_color};
    transition: linear 0.2s;
  }

  .package-language-image {
    width: 25px;
    float: right;
    margin-left: 10px;
  }

  /* mobile */
  @media only screen and (max-width: 550px) {
    .package-title {
      width: 140px;
    }

    .single-app-container {
      min-width: 250px;
    }

    .app-section-description, .package-section-description {
      text-align: center;
      width: 250px;
      font-size: 0.9em;
      margin: 15px 0px 70px 0px;
    }
  }
`;

export {
	WebAppsAndPackagesContainerStyles,
	WebAppsAndPackagesStyles,
};
