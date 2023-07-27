import { slide as Menu } from 'react-burger-menu';
import React from 'react';
import { Link } from 'react-router-dom';
import { BurgerNav, styles } from './StyledNavigation';

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
 A custom React component that returns a side burger menu
 This component is used in Navbar component (./Navbar)
 */
function BurgerMenu() {
	return (
		<BurgerNav>
			<Menu className="burger-menu" styles={styles} noOverlay right disableAutoFocus isOpen={false}>
				{
					navigationLinks.map((link) => (link.name === 'Contact'
						? (
							<div className={`header-link-${link.linkTo} header-link`}>
								<Link
									to={`/${link.linkTo}`}
								>
									{link.name}
								</Link>
							</div>
						) : (
							<div>
								<a
									href={`#${link.linkTo}`}
								>
									{link.name}
								</a>
							</div>
						)))
				}
			</Menu>
		</BurgerNav>
	);
}

export default BurgerMenu;
