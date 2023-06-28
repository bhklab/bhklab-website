import { Link } from 'react-router-dom';
import React from 'react';
import BurgerMenu from './BurgerMenu';
import { LogoContainer, NavLinks, StyledNavigation } from './StyledNavigation';

// navigation links
// note: we could have made an array of names and used them as as the href attribute
// but maybe we want make the name (hyperlink text) and href attribute value different.
// another case could have been an object with key value pair of name and linkTo.
//
const navigationLinks = [
	{ name: 'Home', linkTo: 'home' },
	{ name: 'Mission', linkTo: 'mission' },
	{ name: 'Research', linkTo: 'research' },
	{ name: 'Publications', linkTo: 'publications' },
	{ name: 'Presentations', linkTo: 'presentations' },
	{ name: 'Softwares', linkTo: 'softwares' },
	{ name: 'Team', linkTo: 'team' },
	{ name: 'Contact', linkTo: 'contact' },
];

/**
 *
 * @param {Array} links
 * @returns {React.JSX}
 */
const renderNavigationLins = (links) => links.map((link) => (link.name === 'Contact'
	? (
		<div className={`header-link-${link.linkTo} header-link`}>
			<Link to={`/${link.linkTo}`}>
				{link.name}
			</Link>
		</div>
	) : (
		<div className={`header-link-${link.linkTo} header-link`}>
			<a href={`#${link.linkTo}`}>
				{link.name}
			</a>
		</div>
	)));

/**
 *
 * @returns {React.JSX} - navigation react component
 */
function NavBar() {
	return (
		<StyledNavigation className="navigation-bar">
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
