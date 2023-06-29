import React from 'react';
import PropTypes from 'prop-types';
import { LinkedInEmbed } from 'react-social-media-embed';

/**
 *
 * @param {string} props.url
 * @param {number} props.width
 * @param {number} props.height
 * @returns {JSX.Element}
 */
function Linkedin({ url, width, height }) {
	return (
		<LinkedInEmbed
			url={url}
			width={width}
			height={height}
		/>
	);
}

Linkedin.propTypes = {
	url: PropTypes.string.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
};

Linkedin.defaultProps = {
	width: 500,
	height: 350,
};

export default Linkedin;
