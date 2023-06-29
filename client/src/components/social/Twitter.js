import React from 'react';
import PropTypes from 'prop-types';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

/**
 *
 * @param {string} props.url
 * @param {number} props.width
 * @param {number} props.height
 * @returns {JSX.Element}
 */
function Twitter({ screenName, width, height }) {
	return (
		<TwitterTimelineEmbed
			sourceType="profile"
			screenName={screenName}
			options={{ width, height }}
			// tweetLimit={5}
		/>
	);
}

Twitter.propTypes = {
	screenName: PropTypes.string.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
};

Twitter.defaultProps = {
	width: 500,
	height: 350,
};

export default Twitter;
