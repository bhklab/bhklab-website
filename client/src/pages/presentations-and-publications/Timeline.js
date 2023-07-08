import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { useState } from 'react';
import colors from '../../styles/colors';

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
		color: info;
	}
`;

// timeline years
const YEARS = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013'];

/**
 *
 * @returns {React.JSX}
 */
// TODO: Add props validation
// eslint-disable-next-line react/prop-types
function LeftPositionedTimeline({ selectYear }) {
	const [selectedYear, setSelectedYear] = useState('2023');
	const [itemsLoaded, setItemsLoaded] = useState(6);
	const [itemsButton, setItemsButton] = useState('...');

	const yearAction = (year) => {
		setSelectedYear(year);
		selectYear(year);
	};

	// Adjusting the timeline items and buttons in the timeline component
	const adjustItems = () => {
		// Adding or removing the number of items shown in timeline list
		if (itemsLoaded === 6) {
			setItemsLoaded(itemsLoaded + 3);
		} else if (itemsLoaded === 9) {
			setItemsLoaded(itemsLoaded + 2);
			setItemsButton('show less'); // after all timeline components are rendered change the button's text
		} else {
			setItemsLoaded(6);
			setItemsButton('...'); // when the timeline component is reset change the buttons's text
		}
	};

	/**
	 *
	 * @param {Array} years - an array of years for the timeline
	 * @returns {JSX} - returns the JSX for the timeline
	 */
	// eslint-disable-next-line consistent-return, array-callback-return
	const displayTimeline = (years) => years.map((year, index) => {
		if (index < itemsLoaded) {
			if (index === itemsLoaded - 1) {
				return (
					<TimelineItem
						onClick={() => yearAction(year, index)}
						className="hover-timeline-item static-timeline-item"
					>
						<TimelineSeparator>
							<TimelineDot sx={{ backgroundColor: selectedYear === year ? '#039be5' : '#bdbdbd' }} />
						</TimelineSeparator>
						<TimelineContent color={selectedYear === year ? 'primary' : colors.primary_text_color}>
							{year}
						</TimelineContent>
					</TimelineItem>
				);
			}
			return (
				<TimelineItem
					onClick={() => yearAction(year, index)}
					className="hover-timeline-item static-timeline-item"
				>
					<TimelineSeparator>
						<TimelineDot sx={{ backgroundColor: selectedYear === year ? '#039be5' : '#bdbdbd' }} />
						<TimelineConnector />
					</TimelineSeparator>
					<TimelineContent color={selectedYear === year ? 'primary' : colors.primary_text_color}>
						{year}
					</TimelineContent>
				</TimelineItem>

			);
		}
	});

	return (
		<StyledTimeline>
			<Timeline position="left" sx={{ height: '650px' }}>
				{
					displayTimeline(YEARS)
				}
				<Button
					disableElevation
					disableRipple
					sx={{
						width: itemsLoaded === 11 ? '100px' : '30px',
						margin: itemsLoaded === 11 ? '-35px 0 0 0' : '-50px 0 0 20px',
						fontSize: itemsLoaded === 11 ? '0.63rem' : '2rem',
						'&.MuiButtonBase-root:hover': {	bgcolor: 'transparent' },
					}}
					onClick={() => adjustItems()}
				>
					{itemsButton}
				</Button>
			</Timeline>
		</StyledTimeline>
	);
}

export default LeftPositionedTimeline;
