import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Navbar from '../Navigation/Navbar/Navbar';
import Footer from '../Navigation/Footer/Footer';
import colors from '../../styles/colors';

const Main = styled.div`
	background-color: ${colors.white_background};
	display: flex;
	flex-direction: column;
	row-gap: ${(props) => (props.page.match(/home/ig) ? '' : '60px')};
`;

/**
 * wrapper for every page
 */
function Layout(props) {
	const { children, page } = props;

	return (
		<Main page={page} className="layout-container">
			<Navbar />
			{children}
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
