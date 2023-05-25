import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledSoftware = styled.div`
 a {
    text-decoration: none;
    color: white
  }

  a:focus {
    outline: none;
  }

  .slide-desc {
    display: flex;
    align-items: center;
    position: fixed;
    color: ${colors.blue_background};
    font-size: 1rem;
  }
  
  /* BODY */
  #intro {
    text-align: center;
    line-height: 40px;
    margin-bottom: 50px;
  }

  h1 {
	  color: ${colors.primary_text_color};
	  font-weight: 700;
    font-size: calc(1vw + 0.6em);
  }

  .highlight {
   /* text-decoration: underline; */
   color: ${colors.link_color};
  }

  .web-apps, .packages {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 0px 20px 0px;
  }

  #app {
    flex-grow: 1;
    flex: 1 1 30%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-bottom: 20px;
    min-width: 350px;
    /* max-width: 26.6vw; */
  }

  #app-container, #pkg-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    transition: linear 0.2s;
    a:hover {
      color: ${colors.blue_background};
    }
  }

  #pkg-container {
    flex-direction: row !important;
  }

  /*  WEB APPS */
  .logo {
    width: calc(3vw + 8em);
    opacity: 1;
    transition: linear 0.2s;
  }

  .link {
    width: calc(2vw + 3em);
    padding: 10px 0px;
    background: ${colors.primary_text_color};
    color: white;
    text-align: center;
    font-size: calc(1vw + 0.8em);
    position: absolute;
    top: 25%;
    opacity: 0;
    border-radius: 15px;
    transition: linear 0.2s;
  }

  .bottom-row {
    top: 12%;
  }

  #app-container:hover .link {
    opacity: 1;
    transition: linear 0.2s;
  }

  #app-container:hover .logo {
    opacity: 0;
    transition: linear 0.2s;
  }

  .desc {
    text-align: center;
    width: 350px;
    font-size: 0.9em;
    margin: 15px 0px 35px 0px;
    color: ${colors.primary_text_color};
    font-weight: 100;
  }

  /* PACKAGES */
  .packages {
    margin-top: 3vw;
  }

  .pkg-title {
    background: var(--pkg-color);
    border-radius: 15px;
    color: white;
    background-color: ${colors.blue_background};
    width: 210px;
    padding: 10px 0px;
    font-weight: 700;
    font-size: calc(0.6vw + 0.8em);
    border: 1px solid var(--pkg-color);
    transition: linear 0.2s;
  }

  .pkg-title:hover {
    background: transparent;
    color: ${colors.blue_background};
    transition: linear 0.2s;
  }

  .hovered {color: ${colors.text_light_gray};}
  .pkg-title .hovered { display: none; transition: linear 0.2s;}
  .pkg-title:hover .hovered { display: block; transition: linear 0.2s;}
  .pkg-title:hover .initial { display: none; transition: linear 0.2s;}

  .pkg > .desc {
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
    /* body {
        background-image:url("./images/bg-mobile.png")
    } */
    .pkg-title {
      width: 140px;
    }

    #app {
      min-width: 250px;
    }

    .desc {
      text-align: center;
      width: 250px;
      font-size: 0.9em;
      margin: 15px 0px 70px 0px;
    }

    .slide-desc {
      font-size: 10px;
    }
  }
`;

export default StyledSoftware;
