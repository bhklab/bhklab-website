import styled from 'styled-components';
const StyledCollabs = styled.div`
	.home-component-sub-section {
		padding-top: 50px;

		/* critical containment */
		width: 100%;
		max-width: 100%;
		min-width: 0;
		overflow-x: hidden;
	}

	/* wrapper around the map component */
	.map-embed-shell {
		width: 100%;
		max-width: 100%;
		min-width: 0;
		overflow-x: hidden;
		position: relative;
	}

	/* direct child (your map component root) */
	.map-embed-shell > * {
		width: 100%;
		max-width: 100%;
		min-width: 0;
		overflow-x: hidden;
	}

	/* all descendants use border-box sizing (prevents width math surprises) */
	.map-embed-shell,
	.map-embed-shell * {
		box-sizing: border-box;
	}

	/* if any internal grid/flex child is stretching, this helps */
	.map-embed-shell .space-y-4,
	.map-embed-shell .min-w-0,
	.map-embed-shell .max-w-full {
		min-width: 0;
		max-width: 100%;
	}

	/* extra safety for SVG layout */
	.map-embed-shell svg {
		display: block;
		max-width: 100%;
	}
`;
export default StyledCollabs;
