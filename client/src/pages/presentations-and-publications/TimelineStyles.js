import styled from 'styled-components';
import colors from '../../styles/colors';

// styling for timeline
const StyledTimeline = styled.div`
	max-width: 125px;

	.show-first-button{
		display: block
	}
	.show-second-button{
		display: none
	}

	@media screen and (max-width: 650px) {
		max-width: 325px;
		justify-content: center;
		align-items: center;
		text-align: center;

		.show-first-button{
			display: none
		}
		.show-second-button{
			display: inline
		}

		& .MuiTimeline-root{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			padding: 0;
			width: 225px;
			justify-content: center;
			margin: 0 0 0 30px;
		}
		& .MuiTypography-root{
			padding: 0px;
			font-size: 12px;
		}
		& .MuiTimeline-positionLeft{
			height: 40px;
			justify-content: center;
			align-items: center;
			text-align: center;
		}
		& .MuiTimelineItem-root{
			height: 20px;
			width: 32px;
			justify-content: center;
			align-items: center;
			text-align: center;
		}
		& .MuiTimelineConnector-root {
			width: 0;
			display: none
		}
		& .MuiTimelineDot-root {
			width: 0;
			display: none;
		}
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
