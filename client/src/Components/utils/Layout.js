import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../navigation/navbar/Navbar';
import Footer from '../navigation/footer/Footer';
import { Main } from './UtilStyles';

/**
 * wrapper for every page
 */
function Layout(props) {
	const { children, page } = props;

	return (
		<Main page={page} className="layout-container">
			<Navbar />
			{ children }
			<Footer />
		</Main>
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
	page: PropTypes.string,
};

Layout.defaultProps = {
	page: '',
	children: null,
};

export default Layout;
