import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Navbar from '../Navigation/Navbar/Navbar';
import Footer from '../Navigation/Footer/Footer';
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
function Layout(props) {
	const { children, page } = props;

	return (
		<>
			{ page === 'home' ? <Navbar page="home" /> : <Navbar />}
			<Main>{children}</Main>
			<Footer />
		</>
	);
}

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
