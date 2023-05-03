import styled from 'styled-components';
import colors from './colors';

const StyledNavigation = styled.div`
  /* The dropdown container */

  .dropdown {
    float: right;
    overflow: hidden;
    padding: 22px 0px;
  }

  /* Dropdown button */

  .dropdown .dropbtn .header-link {
    font-size: calc(0.6vw);
    border: none;
    outline: none;
    background-color: inherit;
    font-family: inherit; /* Important for vertical align on mobile phones */
    margin: 10px; /* Important for vertical align on mobile phones */
    display: block;
    text-align: left;
  }

  .dropbtn {
    color: ${colors.navbarText};
  }

  .navbar a:hover, .dropdown:hover , .dropbtn:hover{
    color: ${colors.navbarLink};
    transition: color 0.2s ease-out;
  }

  /* Dropdown content (hidden by default) */
  .dropdown-content {
    margin-top: 18px;
    display: none;
    position: absolute;
    background-color: ${colors.white_background};
    width: 180px;
    border-radius: 1px;
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.2);
    z-index: 999;
  }

  /* Links inside the dropdown */

  .dropdown-content a {
    float: none;
    color: black;
    padding: 12px 16px;
    margin: 0px;
    text-decoration: none;
    display: block;
    -webkit-transition: color 0.2s ease-out;
    -moz-transition: color 0.2s ease-out;
    -o-transition: color 0.2s ease-out;
    transition: color 0.2s ease-out;
  }

  /* Add a grey background color to dropdown links on hover */

  .dropdown-content a:hover {
    background-color: ${colors.white_background};
    border-radius: 1px;
    color: ${colors.navbarLink};
  }

  .dropdown-content a:active {
    background-color: ${colors.navbarLink};
  }

  /* Show the dropdown menu on hover */

  .dropdown:hover .dropdown-content {
    display: block;
  }

  position: fixed;
  width: 100%;
  height: 65px;
  background: ${colors.navbarBackground};
  z-index: 999;

  a {
    color: ${colors.navbarText};
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif
    font-family: 'Roboto', sans-serif;
    font-weight: normal;
  }
`;

const NavLinks = styled.div`
  float:right;
  display: flex;
  flex-direction: row;
  margin-right: 10vw;
  & a {
    color: ${colors.navbarText}
    text-decoration: none;
    font-size: calc(0.3vw + 0.6em);
    margin: 0px 20px;
    letter-spacing: 1px;
    border-bottom: 2px solid transparent;
  }

  & a:hover {
    color: ${colors.navbarLink}
  }

  @media only screen and (max-width: 1000px) {
    display: none;
  }
`;

const BurgerNav = styled.div`
  position: fixed;
  right: 0;
  margin-right: 15vw;
  /*react-burger-nav style*/

  /* Position and sizing of burger button */

  .bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    top: 15px;
    right: 15vw;
  }

  /* Color/shape of burger icon bars */

  .bm-burger-bars {
    background: #1327d4;
  }

  /* Color/shape of burger icon bars on hover*/

  .bm-burger-bars-hover {
    background: #555975;
  }

  /* Position and sizing of clickable cross button */

  .bm-cross-button {
    height: 24px;
    width: 24px;
  }

  /* Color/shape of close button cross */

  .bm-cross {
    background: #3D405A;
  }

  /*
  Sidebar wrapper styles
  Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
  */

  .bm-menu-wrap {
    position: fixed;
    height: 100%;
  }

  /* General sidebar styles */

  .bm-menu {
    background: rgba(255, 255, 255, 0.3);
    padding: 30px 10px 20px 10px;
    font-size: 12px;

    nav {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      a {
        margin-bottom: 15px;
        color: rgb(61, 64, 90);
      }

      button {
        text-align: center;
      }

      .status {
        display: flex;
      }
    }
  }

  /* Morph shape necessary with bubble or elastic */

  .bm-morph-shape {
    fill: #373a47;
  }

  /* Wrapper for item list */

  .bm-item-list {
    color: #b8b7ad;
    padding: 0.8em;
  }

  /* Individual item */

  .bm-item {
    margin-bottom: 20px;
    text-align: left;
  }

  /* Styling of overlay */

  .bm-overlay {
    background: rgba(61, 64, 90, 0.5);
  }

  @media only screen and (min-width: 1001px) {
    display: none;
    .bm-burger-button {
      display: none;
    }

    .bm-menu {
      display: none;
    }

    .bm-cross {
      display: none;
    }
  }
`;

const styles = {
	bmBurgerButton: {
		position: 'fixed',
		width: '27px',
		height: '20px',
		right: '10vw',
		top: '15px',
	},
	bmBurgerBars: {
		background: `${colors.bmBurgerBars}`,
		borderRadius: '3px',
		opacity: 0.8,
		height: '3px',
	},
	bmCrossButton: {
		height: '24px',
		width: '24px',
	},
	bmCross: {
		backgroundColor: `${colors.closeIcon}`,
	},
	bmMenuWrap: {
		position: 'fixed',
	},
	bmMenu: {
		backgroundColor: `${colors.burgerMenuBG}`,
		padding: '0.5em 1.5em 0',
		fontSize: '16px',
	},
	bmItem: {
		color: `${colors.burgerMenuItems}`,
		display: 'inline-block',
	},
	bmOverlay: {
		background: 'rgba(0, 0, 0, 0.3)',
	},
};

const LogoContainer = styled.div`
  margin-left: 5vw;
  float:left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  & img {
    height: 50px;
  }
`;

export {
	BurgerNav,
	styles,
	StyledNavigation,
	NavLinks,
	LogoContainer,
};
