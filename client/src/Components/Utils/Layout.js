import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Navigation/Navbar/Navbar';
import Footer from '../Navigation/Footer/Footer';
import styled from 'styled-components';
import colors from '../../styles/colors';

const Main = styled.main`
  display: flex;
  background-color: ${colors.white_background};
  min-height: 100vh;
  padding-top: 60px;
  flex-direction: column;
  align-items: center;
`;

/**
 * wrapper for every page
 */
const Layout = (props) => {
	const {children, page} = props;

	return(
		<React.Fragment>
			{ page === 'home' ?<Navbar page="home" /> : <Navbar />}
			<Main>{children}</Main>
			<Footer />
		</React.Fragment>
	);
};

Layout.propTypes = {
	/**
     * Layout's children (components on the page)
     */
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

Layout.defaultProps = {
	page: '',
	children: null,
};

export default Layout;
