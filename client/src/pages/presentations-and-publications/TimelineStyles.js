import styled from 'styled-components';
import colors from '../../styles/colors';

// styling for timeline
const StyledTimeline = styled.div`
	max-width: 150px;

	@media screen and (max-width: 500px) {
		display: none;
	}
	
	.static-timeline-item {
		color: ${colors.primary_text_color};
	}	
	.hover-timeline-item:hover {
		color: ${colors.link_color};
		cursor: pointer;
	}
	.selected-timeline-dot {
		color: info;
	}

	/* adjusting Material UI timeline component classes */
	& .MuiTimelineSeparator-root {
		height: 52.5px;
		width: 9px;
	}
	& .MuiTimelineItem-root {
		min-height: 0;
	}
	
`;

export default StyledTimeline;
