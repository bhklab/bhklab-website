import React from 'react';
import PropTypes from 'prop-types';
import { LinkedInEmbed } from 'react-social-media-embed';
import styled from 'styled-components';

const LinkedInStyled = styled.div`
	width: 650px;

	@media screen and (max-width: 1620px) {
		width: 500px;
		overflow: hidden;
	}

	@media screen and (max-width: 650px) {
		width: 300px;
		overflow: hidden;
	}
`;

/**
 *
 * @param {string} props.url
 * @param {number} props.width
 * @param {number} props.height
 * @returns {JSX.Element}
 */
function Linkedin({ url, width, height }) {
	return (
		<LinkedInStyled>
			<LinkedInEmbed
				url={url}
				width={width}
				height={height}
			/>
		</LinkedInStyled>
	);
}

Linkedin.propTypes = {
	url: PropTypes.string.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
};

Linkedin.defaultProps = {
	width: 500,
	height: 410,
};

export default Linkedin;
