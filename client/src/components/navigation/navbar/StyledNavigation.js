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
	padding: 0 clamp(16px, 5vw, 80px);
	box-sizing: border-box;
`;

const LogoContainer = styled.div`
	padding: 5px;
	flex: 0 0 auto;

	& img {
		height: 50px;
		display: block;
	}
`;

const NavLinks = styled.div`
	flex: 1;
	min-width: 0;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	gap: clamp(10px, 1.3vw, 26px);
	font-size: clamp(0.72rem, 0.85vw, 0.95rem);
	white-space: nowrap;

	a {
		text-decoration: none;
	}

	a:hover {
		color: ${colors.link_color} !important;
	}

	.link-pressed {
		color: ${colors.link_color} !important;
	}

	.header-link {
		position: relative;
		flex: 0 0 auto;
	}

	.dropbtn {
		color: ${colors.primary_text_color};
	}

	.dropdown-content {
		display: none;
		position: absolute;
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
		transition: color 0.2s ease-out;
	}

	.dropdown-content a:hover {
		color: ${colors.link_color};
	}

	.header-link:hover,
	.dropbtn:hover {
		.dropdown-content {
			display: block;
		}
	}

	@media only screen and (max-width: 1023px) {
		display: none;
	}
`;

const BurgerNav = styled.div`
	position: fixed;
	right: 0;
	top: 0;

	.burger-menu {
		box-shadow: 0px 0px 10px ${colors.card_shadow_color};
	}

	.bm-burger-button {
		position: fixed;
		width: 36px;
		height: 30px;
		top: 20px;
		right: clamp(16px, 5vw, 80px);
	}

	.bm-burger-bars {
		background: ${colors.primary_text_color};
	}

	.bm-burger-bars-hover {
		background: ${colors.dark_gray};
	}

	.bm-cross-button {
		margin: 20px;
	}

	.bm-cross {
		background: ${colors.dark_gray};
		height: 20px !important;
	}

	.bm-menu-wrap {
		position: fixed;
		height: 100%;
	}

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

	.bm-morph-shape {
		fill: ${colors.primary_text_color};
	}

	.bm-item-list {
		margin-top: 50px;
		padding: 20px;
	}

	.bm-item {
		padding: 5px 0;
	}

	.bm-overlay {
	}

	@media only screen and (min-width: 1024px) {
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
		right: 'clamp(16px, 5vw, 80px)',
		top: '25px',
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

export { BurgerNav, styles, StyledNavigation, NavLinks, LogoContainer };
