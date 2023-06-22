import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import BurgerMenu from './BurgerMenu';
import { LogoContainer, NavLinks, StyledNavigation } from './StyledNavigation';
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
		<StyledNavigation className="navigation-bar">
			<LogoContainer>
				<Link to="/">
					<img alt="logo" src="/images/Logo/bhklogo.png" />
				</Link>
			</LogoContainer>
			<BurgerMenu />
			<NavLinks className="header-links-container">
				<div className="header-link-research header-link">
					<a href="#home">
						Home
					</a>
				</div>
				<div className="header-link-research header-link">
					<a href="#vision">
						Vision
					</a>
				</div>
				<div className="header-link-research header-link">
					<a href="#research">
						Research
					</a>
				</div>
				<div className="header-link-publications header-link">
					<a href="#publications">
						Publications
					</a>
				</div>
				<div className="header-link-software header-link">
					<a href="#presentations">
						Presentations
					</a>
				</div>
				<div className="header-link-software header-link">
					<a href="#softwares">
						Software
					</a>
				</div>
				<div className="header-link-software header-link">
					<a href="#team">
						Team
					</a>
				</div>
				<div className="header-link-software header-link">
					<Link to="/contact">
						Contact
					</Link>
				</div>
				{/* <div className="header-link-resources header-link">
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
				</div> */}
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
