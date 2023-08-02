import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Button from '@mui/material/Button';
import { useState } from 'react';
import colors from '../../styles/colors';
import StyledTimeline from './TimelineStyles';

// timeline years
const YEARS = ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013'];

/**
 *
 * @returns {React.JSX}
 */
// TODO: Add props validation
// eslint-disable-next-line react/prop-types
function LeftPositionedTimeline({ selectYear }) {
	const [selectedYear, setSelectedYear] = useState('');
	const [itemsLoaded, setItemsLoaded] = useState(6);
	const [itemsButton, setItemsButton] = useState('show more');

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
			setItemsButton('show more'); // when the timeline component is reset change the buttons's text
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
			<Timeline position="left" sx={{ height: '700px' }}>
				{
					displayTimeline(YEARS)
				}
				<Button
					disableElevation
					disableRipple
					className="show-first-button"
					sx={{
						width: '60px',
						margin: '0',
						fontSize: '0.63em',
						padding: '0px',
						'&.MuiButtonBase-root:hover': {	bgcolor: 'transparent' },
						height: '20px',
					}}
					onClick={() => adjustItems()}
				>
					{itemsButton}
				</Button>
			</Timeline>
			<Button
				disableElevation
				disableRipple
				className="show-second-button"
				sx={{
					width: '60px',
					margin: '0',
					fontSize: '0.63em',
					padding: '0px',
					'&.MuiButtonBase-root:hover': {	bgcolor: 'transparent' },
					height: '20px',
				}}
				onClick={() => adjustItems()}
			>
				{itemsButton}
			</Button>
		</StyledTimeline>
	);
}

export default LeftPositionedTimeline;
