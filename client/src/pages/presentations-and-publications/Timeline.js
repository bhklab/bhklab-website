import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import styled from 'styled-components';
import colors from '../../styles/colors';

// styling for timeline
const StyledTimeline = styled.div`
	max-width: 150px;
	min-width: 150px;
`;

// timeline years
const YEARS = ['2023', '2022', '2021', '2020', '2019', '2018'];

/**
 *
 * @returns {React.JSX}
 */
function LeftPositionedTimeline({ selectYear }) {
	/**
	 *
	 * @param {Array} years - an array of years for the timeline
	 * @returns {JSX} - returns the JSX for the timeline
	 */
	const displayTimeline = (years) => years.map((year, index) => {
		if (index === years.length - 1) {
			return (
				<TimelineItem onClick={() => selectYear(year)} >
					<TimelineSeparator>
						<TimelineDot />
					</TimelineSeparator>
					<TimelineContent
						x={{ color: colors.primary_text_color }}
					>
						{year}
					</TimelineContent>
				</TimelineItem>
			);
		}
		return (
			<TimelineItem onClick={() => selectYear(year)} >
				<TimelineSeparator>
					<TimelineDot />
					<TimelineConnector />
				</TimelineSeparator>
				<TimelineContent
					sx={{ color: colors.primary_text_color }}
				>
					{year}
				</TimelineContent>
			</TimelineItem>
		);
	});

	return (
		<StyledTimeline>
			<Timeline position="left">
				{
					displayTimeline(YEARS)
				}
			</Timeline>
		</StyledTimeline>
	);
}

export default LeftPositionedTimeline;
