import { slide as Menu } from 'react-burger-menu';
import React from 'react';
import {NavLink} from 'react-router-dom';
import {BurgerNav, styles} from '../../../styles/StyledNavigation';


const dropdownItems = (data) => data.map((x) => (
	<NavLink key={x.url} to={x.url}>{x.name}</NavLink>
));

/**
 A custom React component that returns a side burger menu
 This component is used in Navbar component (./Navbar)
 */
const BurgerMenu = () => {

	const researchLinks = [
		{ url: '/research', name: 'Research'}
	];

	const publicationsLinks = [
		{ url: '/publications', name: 'Publications'},
		{ url: '/presentations', name: 'Presentations' }
	];

	const resourceLinks = [
		{ url: '/datasets', name: 'Datasets' },
		{ url: '/equipments', name: 'Equipments' }
	];

	const aboutLinks = [
		{ url: '/people', name: 'People' },
		{ url: '/collaboration', name: 'Collaborations' },
		{ url: '/positions', name: 'Join Us' },
		{ url: '/contact', name: 'Contact' },
	];

	const softwareLinks = [
		{ url: '/software', name: 'Software' },
	];
	return (
		<BurgerNav>
			<Menu className="burger-menu" styles={styles} noOverlay right disableAutoFocus isOpen={false}>
				{dropdownItems(researchLinks)}
				{dropdownItems(publicationsLinks)}
				{dropdownItems(resourceLinks)}
				{dropdownItems(softwareLinks)}
				<a href="https://github.com/bhklab" target='_blank' rel="noreferrer">GitHub</a>
				{dropdownItems(aboutLinks)}
			</Menu>
		</BurgerNav>
	);
};

export default BurgerMenu;
