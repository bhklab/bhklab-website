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

	.plot-toggle {
		position: relative;
		display: inline-flex;
		height: 1.25rem;
		width: 2.5rem;
		cursor: pointer;
		border-radius: 9999px;
		padding: 0.125rem;
		transition:
			background-color 200ms ease-in-out,
			color 200ms ease-in-out;
		border: none;
	}

	.plot-toggle--on {
		background-color: green;
	}

	.plot-toggle--on:hover {
		background-color: green;
	}

	.plot-toggle--off {
		background-color: #d1d5db;
	}

	.plot-toggle--off:hover {
		background-color: #9ca3af;
	}

	.plot-toggle__knob {
		display: inline-block;
		height: 1rem;
		width: 1rem;
		border-radius: 9999px;
		background-color: white;
		transform: translateX(0);
		transition: transform 200ms ease-in-out;
	}

	.plot-toggle__knob--right {
		transform: translateX(1.25rem); /* translate-x-6 */
	}
`;
export default StyledCollabs;
