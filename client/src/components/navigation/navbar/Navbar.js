import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import BurgerMenu from './BurgerMenu';
import { LogoContainer, NavLinks, StyledNavigation } from './StyledNavigation';
import colors from '../../../styles/colors';

// navigation links
// note: we could have made an array of names and used them as as the href attribute
// but maybe we want make the name (hyperlink text) and href attribute value different.
// another case could have been an object with key value pair of name and linkTo.
//
const navigationLinks = [
	{ name: 'Home', linkTo: 'home' },
	{ name: 'Mission', linkTo: 'mission' },
	{ name: 'Research', linkTo: 'research-axis' },
	{ name: 'Preprints', linkTo: 'preprints' },
	{ name: 'Publications', linkTo: 'publications' },
	{ name: 'Presentations', linkTo: 'presentations' },
	{ name: 'Softwares', linkTo: 'softwares' },
	{ name: 'Team', linkTo: 'team' },
	{ name: 'Contact', linkTo: 'contact' },
];

/**
 *
 * @returns {React.JSX} - navigation react component
 */
function NavBar() {
	const [scrolled, setScrolled] = useState(false);
	const [pressed, setPressed] = useState('');
	const location = useLocation();
	const isScrolling = () => {
		if (window.scrollY > 80) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	};
	window.addEventListener('scroll', isScrolling);

	// set a link on navbar to 'pressed'
	const pressedLink = (linkName) => {
		setPressed(linkName);
	};

	/**
	*
	* @param {Array} links
	* @returns {React.JSX}
	*/
	const renderNavigationLins = (links) => {
		// if on homepage render this version of nav-bar
		if (location.pathname === '/') {
			return (
				links.map((link) => (link.name === 'Contact'
					? (
						<div className={`header-link-${link.linkTo} header-link`}>
							<Link
								className={pressed === link.name ? 'link-pressed' : ''}
								onClick={() => pressedLink()}
								style={{ color: scrolled ? `${colors.primary_text_color}` : 'white' }}
								to={`/${link.linkTo}`}
							>
								{link.name}
							</Link>
						</div>
					) : (
						<div className={`header-link-${link.linkTo} header-link`}>
							<a
								className={pressed === link.name ? 'link-pressed' : ''}
								onClick={() => pressedLink(link.name)}
								style={{ color: scrolled ? `${colors.primary_text_color}` : 'white' }}
								href={`#${link.linkTo}`}
							>
								{link.name}
							</a>
						</div>
					))));
		}
		// if not on homepage render this version of nav-bar
		return (
			links.map((link) => (link.name === 'Contact'
				? (
					<div className={`header-link-${link.linkTo} header-link`}>
						<Link
							className="link-pressed"
							onClick={() => pressedLink()}
							style={{ color: `${colors.primary_text_color}` }}
							to={`/${link.linkTo}`}
						>
							{link.name}
						</Link>
					</div>
				) : (
					<div className={`header-link-${link.linkTo} header-link`}>
						<a
							onClick={() => pressedLink(link.name)}
							style={{ color: `${colors.primary_text_color}` }}
							href={`#${link.linkTo}`}
						>
							{link.name}
						</a>
					</div>
				))));
	};
	// if on homepage render nav-bar with transparent + scroll attribute
	if (location.pathname === '/') {
		return (
			<StyledNavigation style={{ backgroundColor: scrolled ? 'white' : 'transparent' }}>
				<LogoContainer>
					<Link to="/">
						<img alt="logo" src="/images/Logo/bhklogo.png" />
					</Link>
				</LogoContainer>
				<BurgerMenu />
				<NavLinks className="header-links-container">
					{
						renderNavigationLins(navigationLinks)
					}
				</NavLinks>
			</StyledNavigation>
		);
	}
	// if not on homepage render nav-bar without transparent + scroll attribute
	return (
		<StyledNavigation style={{ backgroundColor: 'white' }}>
			<LogoContainer>
				<Link to="/">
					<img alt="logo" src="/images/Logo/bhklogo.png" />
				</Link>
			</LogoContainer>
			<BurgerMenu />
			<NavLinks className="header-links-container">
				{
					renderNavigationLins(navigationLinks)
				}
			</NavLinks>
		</StyledNavigation>
	);
}

export default NavBar;
