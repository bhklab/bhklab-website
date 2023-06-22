import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import colors from '../../styles/colors';

// timeline years
const YEARS = ['2023', '2022', '2021', '2020', '2019', '2018'];

/**
 *
 * @param {Array} years - an array of years for the timeline
 * @returns {JSX} - returns the JSX for the timeline
 */
const displayTimeline = (years) => years.map((year, index) => {
	if (index === years.length - 1) {
		return (
			<TimelineItem>
				<TimelineSeparator>
					<TimelineDot />
				</TimelineSeparator>
				<TimelineContent x={{ color: colors.primary_text_color }}>
					{year}
				</TimelineContent>
			</TimelineItem>
		);
	}
	return (
		<TimelineItem>
			<TimelineSeparator>
				<TimelineDot />
				<TimelineConnector />
			</TimelineSeparator>
			<TimelineContent sx={{ color: colors.primary_text_color }}>
				{year}
			</TimelineContent>
		</TimelineItem>
	);
});

/**
 *
 * @returns {React.JSX}
 */
function LeftPositionedTimeline() {
	return (
		<Timeline position="left">
			{
				displayTimeline(YEARS)
			}
		</Timeline>
	);
}

export default LeftPositionedTimeline;
