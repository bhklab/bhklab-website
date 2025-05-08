import React from 'react';
import PropTypes from 'prop-types';
import { LinkedInEmbed } from 'react-social-media-embed';
import styled from 'styled-components';

const LinkedInStyled = styled.div`
	width: 325px;
	border-top: 0.5px solid #CFD9DE;
	border-bottom: 0.5px solid #CFD9DE;
	border-right: 0.5px solid #CFD9DE;
	border-radius: 1rem;
	overflow: hidden;
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
	width: 325,
	height: 750,
};

export default Linkedin;
