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
				<Link to="/"><img alt="logo" src="/images/Logo/bhklogo.png" /></Link>
			</LogoContainer>
			<BurgerMenu />
			<NavLinks className="header-links">
				<div className="dropdown" style={{ verticalAlign: 'middle' }}><a href="/research">Research</a></div>
				<div className="dropdown">
					<a className="dropbtn">Publications</a>
					<div className="dropdown-content">
						<Link to="/publications">Papers</Link>
						<Link to="/presentations">Presentations</Link>
					</div>
				</div>
				<div className="dropdown">
					<a className="dropbtn">Resources</a>
					<div className="dropdown-content">
						<Link to="/datasets">Datasets</Link>
						<Link to="/equipments">Equipments</Link>
					</div>
				</div>
				<div className="dropdown" style={{ verticalAlign: 'middle' }}><a href="/software">Software</a></div>
				<div className="dropdown">
					<Link className="dropbtn">About</Link>
					<div className="dropdown-content">
						<Link to="/people">People</Link>
						<Link to="/collaboration">Collaboration</Link>
						<Link to="/positions">Join Us</Link>
						<Link to="/contact">Contact</Link>
					</div>
				</div>
				{
					// admin ?
					//     <button onClick={logout}>Logout</button>
					//     :
					//     <Link exact to='/admin'>
					//         Login
					//     </Link>
					admin
                    && <button onClick={logout}>Logout</button>
				}
			</NavLinks>
		</StyledNavigation>
	);
}

export default NavBar;
