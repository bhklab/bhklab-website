/**
 A custom react component that returns a navbar
 based on the size of browser navbar includes links to individual pages or a burger menu
 */
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import BurgerMenu from './BurgerMenu';
import { LogoContainer, NavLinks, StyledNavigation } from '../../../styles/StyledNavigation';
import useAuth from '../../../hooks/useAuth';
import AuthContext from '../../../hooks/Contexts';

function NavBar() {
	const { logoutAdmin } = useAuth();
	const { admin } = useContext(AuthContext);

	const logout = async (e) => {
		e.preventDefault();
		await logoutAdmin();
	};
	return (
		<StyledNavigation>
			<LogoContainer>
				<Link to="/">
					<img alt="logo" src="/images/Logo/bhklogo.png" />
				</Link>
			</LogoContainer>
			<BurgerMenu />
			<NavLinks className="header-links-container">
				<div className="header-link-research header-link">
					<Link to="/">Home</Link>
				</div>
				<div>
					<a href="#vision"> Vision </a>
				</div>
				<div className="header-link-research header-link">
					<a href="#research-topics">Research</a>
				</div>
				<div className="header-link-publications header-link">
					<div className="dropbtn">Publications</div>
					<div className="dropdown-content">
						<Link to="/publications">Papers</Link>
						<Link to="/presentations">Presentations</Link>
					</div>
				</div>
				<div className="header-link-resources header-link">
					<div className="dropbtn">Resources</div>
					<div className="dropdown-content">
						<Link to="/datasets">Datasets</Link>
						<Link to="/equipments">Equipments</Link>
					</div>
				</div>
				<div className="header-link-about header-link">
					<div className="dropbtn">About</div>
					<div className="dropdown-content">
						<Link to="/people">People</Link>
						<Link to="/collaboration">Collaboration</Link>
						<Link to="/positions">Join Us</Link>
						<Link to="/contact">Contact</Link>
					</div>
				</div>
				<div className="header-link-software header-link">
					<Link to="/software">Software</Link>
				</div>
				{
					// admin ?
					//     <button onClick={logout}>Logout</button>
					//     :
					//     <Link exact to='/admin'>
					//         Login
					//     </Link>
					admin
                     && <button type="button" onClick={logout}>Logout</button>
				}
			</NavLinks>
		</StyledNavigation>
	);
}

export default NavBar;
