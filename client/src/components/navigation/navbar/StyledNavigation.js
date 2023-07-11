import styled from 'styled-components';
import colors from '../../../styles/colors';

const StyledNavigation = styled.nav`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 1000;
  box-shadow: 0px 0px 10px ${colors.card_shadow_color};
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

  a:hover {
    color: ${colors.link_color} !important;
  }
  .contact-link-pressed {
	color: ${colors.link_color} !important;
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
    box-shadow: 0px 5px 5px 0px ${colors.card_shadow_color};
    z-index: 999;
  }  

  .dropdown-content a {
    display: block;
    color: ${colors.primary_text_color};
    padding: 12px 16px;
    text-decoration: none;
    background-color: ${colors.white_color};
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
    font-size: 1.05rem;
  }

  
`;

const BurgerNav = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  margin-right: 15vw;
  /*react-burger-nav style*/

  /* Position and sizing of burger button */

  .burger-menu {
    box-shadow: 0px 0px 10px ${colors.card_shadow_color};
  }

  .bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    top: 15px;
    right: 15vw;
  }

  /* Color/shape of burger icon bars */

  .bm-burger-bars {
    background: ${colors.primary_text_color};
  }

  /* Color/shape of burger icon bars on hover*/

  .bm-burger-bars-hover {
    background: ${colors.dark_gray};
  }

  /* Position and sizing of clickable cross button */

  .bm-cross-button {
    margin: 20px;
  }

  /* Color/shape of close button cross */

  .bm-cross {
    background: ${colors.dark_gray};
    height: 20px !important;
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
    background: ${colors.white_color};
    padding: 30px 10px 20px 10px;
    font-size: 12px;

    nav {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      a {
        margin-bottom: 15px;
        color: ${colors.primary_text_color};
      }

      a:hover {
        color: ${colors.link_color};
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
    fill: ${colors.primary_text_color};
  }

  /* Wrapper for item list */

  .bm-item-list {
    margin-top: 50px;
    padding: 20px;
  }

  /* Individual item */

  .bm-item {
    /* text-align: left; */
    padding: 5px 0;
  }

  /* Styling of overlay */
  .bm-overlay {
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
		background: `${colors.card_shadow_color}`,
	},
};

export {
	BurgerNav,
	styles,
	StyledNavigation,
	NavLinks,
	LogoContainer,
};
