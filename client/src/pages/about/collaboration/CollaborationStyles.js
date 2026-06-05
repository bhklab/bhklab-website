// src/components/.../CollaborationStyles.js
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

	/* ---------------- Toggle rows (Map/Graph + Detailed View) ---------------- */
	.view-toggle-row {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
		padding: 6px 0 18px 0;
		flex-wrap: wrap;
		position: relative;
	}

	.view-toggle-title {
		font-weight: 700;
		font-size: 14px;
	}

	.view-toggle-control {
		display: inline-flex;
		align-items: center;
		gap: 10px;

		/* desktop: move only Map / toggle / Graph lower */
		position: absolute;
		right: 0;
		top: 40px;
		z-index: 20;
	}

	.view-toggle-label {
		font-size: 13px;
		font-weight: 600;
		opacity: 0.9;
	}

	/* mobile: put it back into normal flow so it doesn't overlap */
	@media (max-width: 600px) {
		.view-toggle-row {
			flex-direction: column;
			align-items: flex-start;
			padding-bottom: 18px;
		}

		.view-toggle-control {
			position: static;
			margin-top: 8px;
		}
	}
	/* ---------------- Shared flip-switch (plot-toggle + map-toggle) ---------------- */
	.plot-toggle,
	.map-toggle {
		position: relative;
		display: inline-flex;

		/* ✅ larger size so it matches your other toggle visually */
		height: 20px;
		width: 36px;

		cursor: pointer;
		border-radius: 9999px;
		padding: 3px;

		transition:
			background-color 200ms ease-in-out,
			color 200ms ease-in-out;

		border: none;
		outline: none;
	}

	.plot-toggle--on,
	.map-toggle--on {
		background-color: #16a34a; /* green */
	}

	.plot-toggle--on:hover,
	.map-toggle--on:hover {
		background-color: #15803d;
	}

	.plot-toggle--off,
	.map-toggle--off {
		background-color: #d1d5db; /* gray-300 */
	}

	.plot-toggle--off:hover,
	.map-toggle--off:hover {
		background-color: #9ca3af; /* gray-400 */
	}

	.plot-toggle:focus-visible,
	.map-toggle:focus-visible {
		box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.25);
	}

	.plot-toggle__knob,
	.map-toggle__knob {
		display: inline-block;
		flex-shrink: 0;

		height: 14px;
		min-width: 14px;

		border-radius: 9999px;
		background-color: #ffffff;

		transform: translateX(0);
		transition: transform 200ms ease-in-out;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
	}

	/* travel = width(56) - knob(22) - padding*2(6) = 28px */
	.plot-toggle__knob--right,
	.map-toggle__knob--right {
		transform: translateX(16px);
	}

	/* existing structure helper */
	.collabs-stack {
		display: flex;
		flex-direction: column;
		gap: 24px;
		min-width: 0;
	}

	.collabs-map {
		width: 100%;
		min-width: 0;
		max-width: 100%;
	}

	.collabs-details {
		width: 100%;
		display: flex;
		justify-content: center;
		min-width: 0;
	}
`;

export default StyledCollabs;
