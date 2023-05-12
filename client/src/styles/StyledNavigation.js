import styled from 'styled-components';
import colors from './colors';

const StyledNavigation = styled.nav`
  border-bottom: 1px solid ${colors.border_line_color};
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  margin-left: 5vw;
  padding: 5px;
  width: 20vw;
  & img {
    height: 50px;
  }
`;

const NavLinks = styled.div`
  width: 70vw;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  font-size: 0.9rem;
  
  a {
    color: ${colors.primary_text_color};
  }

  a:hover {
    color: ${colors.link_color};
  }

  .header-link {
    position: relative;
  }

  .dropbtn {
    color: ${colors.primary_text_color};
  }

  .dropdown-content {
    display: none;
    position: absolute;
    /* margin-top: 5px; */
    border-radius: 1px;
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.2);
    z-index: 999;
  }  

  .dropdown-content a {
    display: block;
    color: ${colors.primary_text_color};
    padding: 12px 16px;
    text-decoration: none;
    background-color: ${colors.white_background};
    -webkit-transition: color 0.2s ease-out;
    -moz-transition: color 0.2s ease-out;
    -o-transition: color 0.2s ease-out;
    transition: color 0.2s ease-out;
  }

  .dropdown-content a:hover {
    color: ${colors.link_color};
  }

  .header-link:hover, .dropbtn:hover {
   .dropdown-content {
    display: block;
   }
  }
  
  @media only screen and (max-width: 1000px) {
    display: none;
  }

  @media only screen and (min-width: 1200px) {
    width: 55vw;
  }

  @media only screen and (min-width: 1600px) {
    width: 50vw;
  }

  @media only screen and (min-width: 1950px) {
    width: 35vw;
    font-size: 1rem;
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

export {
	BurgerNav,
	styles,
	StyledNavigation,
	NavLinks,
	LogoContainer,
};
