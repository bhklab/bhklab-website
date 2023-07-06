import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { grey } from '@mui/material';
import styled from 'styled-components';
import colors from '../../styles/colors';
import { useState } from 'react';

// styling for timeline
const StyledTimeline = styled.div`
	max-width: 150px;
	min-width: 150px;
	
	.static-timeline-item {
		color: ${colors.primary_text_color};
	}	
	.hover-timeline-item:hover {
		color: ${colors.link_color};
		cursor: pointer;
	}
	.selected-timeline-dot{
		color: info
	}
`;

// timeline years
const YEARS = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013'];

/**
 *
 * @returns {React.JSX}
 */
function LeftPositionedTimeline({ selectYear }) {
	const [selectedYear, setSelectedYear] = useState('2023');
	const [color, setColor] = useState('')

	const yearAction = (year) => {
		setSelectedYear(year)
		selectYear(year)
	}

	/**
	 *
	 * @param {Array} years - an array of years for the timeline
	 * @returns {JSX} - returns the JSX for the timeline
	 */
	const displayTimeline = (years) => years.map((year, index) => {
		if (index === years.length - 1) {
			return (
				<TimelineItem onClick={() => yearAction(year, index) } className='hover-timeline-item static-timeline-item'>
					<TimelineSeparator >
						<TimelineDot sx={{ backgroundColor: selectedYear === year ? '#039be5' : '#bdbdbd'}}/>
					</TimelineSeparator>
					<TimelineContent color={selectedYear === year ? 'primary' : colors.primary_text_color}>
						{year}
					</TimelineContent>
				</TimelineItem>
			);
		}
		return (
			<TimelineItem onClick={() => yearAction(year, index)} className='hover-timeline-item static-timeline-item'>
				<TimelineSeparator>
					<TimelineDot sx={{ backgroundColor: selectedYear === year ? '#039be5' : '#bdbdbd'}}/>
					<TimelineConnector/>
				</TimelineSeparator >
				<TimelineContent color={selectedYear === year ? 'primary' : colors.primary_text_color}>
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
