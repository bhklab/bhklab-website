import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledSoftware = styled.div`
  max-width: 100%;

  .component-heading {
    text-align: center;
    line-height: 40px;
    margin-bottom: 50px;
  }

  .highlight {
    color: ${colors.link_color};
  }

  .web-apps-container, .packages-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  .single-app-container, .single-package-container {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    flex-basis: 30%;
    /* flex: 1 1 30%; */
    position: relative;
    margin-bottom: 20px;
    min-width: 350px;
  }

  .app-section, .package-section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    transition: linear 0.2s;
    min-height: 100px;
  }

  .package-section {
    flex-direction: row !important;
  }

  /*  WEB APPS */
  .logo {
    width: calc(3vw + 8em);
    opacity: 1;
    transition: linear 0.2s;
  }

  .link {
    width: calc(2vw + 3rem);
    padding: 10px 0px;
    background: ${colors.primary_text_color};
    color: ${colors.white_color};
    text-align: center;
    font-size: calc(1vw + 0.8rem);
    position: absolute;
    top: 25%;
    opacity: 0;
    border-radius: 15px;
    transition: linear 0.2s;
  }

  .app-section:hover .link {
    opacity: 1;
    transition: linear 0.2s;
  }

  .app-section:hover .logo {
    opacity: 0;
    transition: linear 0.2s;
  }

  .description-section {
    text-align: center;
    width: 350px;
    font-size: 0.9em;
    margin: 15px 0px 35px 0px;
    color: ${colors.primary_text_color};
    font-weight: 100;
  }

  /* PACKAGES */
  .packages-container {
    margin-top: 3vw;
  }

  .package-title {
    border-radius: 15px;
    color: ${colors.white_color};
    background: ${colors.primary_text_color};
    width: 210px;
    padding: 10px 0px;
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

  .hovered {color: ${colors.text_light_gray};}
  .package-title .hovered { display: none; transition: linear 0.2s;}
  .package-title:hover .hovered { display: block; transition: linear 0.2s;}
  .package-title:hover .initial { display: none; transition: linear 0.2s;}

  .single-package-container > .description-section {
    margin-bottom: 50px;
  }

  .lang {
    width: 25px;
    float: right;
    margin-left: 10px;
  }

  /* MOBILE RESPONSIVENESS */
  @media only screen and (max-width: 1311px) {
    body {
      /* margin-bottom:30px; */
    }
  }
  /* tablet */
  @media only screen and (max-width: 1311px) and (min-width: 873px) {
    .up {
      margin-top: -15px;
    }
  }

  /* mobile */
  @media only screen and (max-width: 550px) {
    .package-title {
      width: 140px;
    }

    .single-app-container {
      min-width: 250px;
    }

    .description-section {
      text-align: center;
      width: 250px;
      font-size: 0.9em;
      margin: 15px 0px 70px 0px;
    }
  }
`;

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;

	hr {
		margin-bottom: 50px;
	}
`;

export {
	StyledSoftware,
	StyledContainer,
};
