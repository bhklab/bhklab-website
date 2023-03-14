/**
 A custom react component that returns a navbar
 based on the size of browser navbar includes links to individual pages or a burger menu
 */
import BurgerMenu from "./BurgerMenu";
import {Link} from 'react-router-dom' ;
import {LogoContainer, NavLinks, StyledNavigation} from "../../../styles/StyledNavigation";
import React from 'react';


const NavBar= () => {
    return (
        <StyledNavigation>
            <LogoContainer>
                <Link to="/"><img alt="logo" src={'/images/Logo/bhklab-logo-white.png'} /></Link>
            </LogoContainer>
            <BurgerMenu/>
            <NavLinks className="header-links">
                <div className="dropdown" style={{ verticalAlign: 'middle'}}><a  href="/research">Research</a></div>
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
                <div className="dropdown" style={{ verticalAlign: 'middle'}}><a  href="/software">Software</a></div>
                <div className="dropdown">
                    <Link className="dropbtn">About</Link>
                    <div className="dropdown-content">
                        <Link to="/people">People</Link>
                        <Link to="/collaboration">Collaboration</Link>
                        <Link to="/positions">Join Us</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                </div>
            </NavLinks>
        </StyledNavigation>
    )
}

export default NavBar;
