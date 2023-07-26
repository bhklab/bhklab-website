import React from 'react';
import PropTypes from 'prop-types';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import styled from 'styled-components';

const TwitterStyled = styled.div`
	width: 650px;

	@media screen and (max-width: 650px) {
		width: 350px;
	}
`;

/**
 *
 * @param {string} props.url
 * @param {number} props.width
 * @param {number} props.height
 * @returns {JSX.Element}
 */
function Twitter({ screenName, width, height }) {
	return (
		<TwitterStyled>
			<TwitterTimelineEmbed
				sourceType="profile"
				screenName={screenName}
				options={{ width, height }}
				// tweetLimit={5}
			/>
		</TwitterStyled>
	);
}

Twitter.propTypes = {
	screenName: PropTypes.string.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
};

Twitter.defaultProps = {
	width: '100%',
	height: '500px',
};

export default Twitter;
