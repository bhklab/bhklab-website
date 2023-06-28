import styled from "styled-components";

const StyledPlot = styled.div`
  body {
	font-family:Arial;
  }

  label {
	font-weight:bold;
	font-size:17px;
  }

  .na {
	color: red;
	display:none;
  }

  .ui-widget-content {
	background: transparent;
  }

  /* form */
  .button-group {
	display: flex;
	flex-direction: row;
  }

  .button-group > * {
	margin:40px 20px 0px 0px;
	cursor: pointer;
  }

  .number-group {
	display: flex;
	flex-direction: row;
	font-size:18px;
	margin: 100px 0px 40px 0px;
  }

  .number-group > * {
	margin-right: 30px;
  }

  .form-group {
	display:flex;
	flex-direction:column;
	justify-content:flex-start;
	font-size:18px;
	margin:0px;
  }

  .form-group > * {
	margin:10px 0px;
  }

  .divider {
	width:100%;
	height:4px;
	margin-top:30px;
	border-top: 2px solid var(--main-color);
	border-bottom: 2px solid var(--main-color);
  }

  .form-fill {
	border-bottom: 2px solid var(--main-color);
	margin: 20px 0px;
	padding-bottom:10px;
	display:flex;
	flex-direction:row;
	justify-content: space-between;
  }

  .plus, .minus {
	display: block;
  }

  .text-muted {
	margin:5px 0px;
  }

  .form-enter {
	width:45%;
	height:30px;
	font-size:15px;
	border: 1px solid var(--main-color);
	color: var(--main-color);
  }

  .form-enter-button-group {
	width:5%;
	height:30px;
	display:flex;
	flex-direction:column;
	justify-content: center;
	text-align:center;
	font-size:23px;
  }

  .form-enter-button {
	cursor: pointer;
  }

  .form-button {
	width:200px;
	height: 30px;
	font-size: 16px;
	background: gray;
	border: none;
	color: white;
  }

  .example, .clear, .example-csv, .example-labcsv {
	background: var(--main-color);
  }

  .submit {
	cursor: default;
  }

  .text-muted {
	opacity: 0.8;
  }

  /* csv upload styling */
  .csv-area, .labcsv-area {
	margin-top:30px;
	width: 100%;
	min-height: 200px;
	padding: 0;
  }



  /* radio buttons */
  /* The container */
  .radio-container {
	display: block;
	position: relative;
	padding-left: 35px;
	margin-bottom: 12px;
	cursor: pointer;
	font-size: 22px;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
  }

  /* Hide the browser's default radio button */
  .radio-container input {
	position: absolute;
	opacity: 0;
	cursor: pointer;
  }

  /* Create a custom radio button */
  .checkmark {
	position: absolute;
	top: 3px;
	left: 6px;
	height: 20px;
	width: 20px;
	background-color: #eee;
	border-radius: 50%;
  }

  /* On mouse-over, add a grey background color */
  .radio-container:hover input ~ .checkmark {
	background-color: #ccc;
  }

  /* When the radio button is checked, add a blue background */
  .radio-container input:checked ~ .checkmark {
	background-color: #2196F3;
  }

  /* Create the indicator (the dot/circle - hidden when not checked) */
  .checkmark:after {
	content: "";
	position: absolute;
	display: none;
  }

  /* Show the indicator (dot/circle) when checked */
  .radio-container input:checked ~ .checkmark:after {
	display: block;
  }

  /* Style the indicator (dot/circle) */
  .radio-container .checkmark:after {
	top: 6px;
	left: 6px;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: white;
  }
  /* plots */
  #networkPlot {
	background: white;
	display:block;
  }
  #upsetPlot {
	background: white;
	display:none;
	overflow: auto;
	width: 900px;
  }
  #circosPlot {
	background: white;
	height:900px;
	display:none;
  }

  /* containers */
  #body-container {
	display:flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height:calc(100vh - 60px - 60px);
	color: var(--main-color) !important;
  }

  .form-container {
	margin-top:20px;
	padding: 0px 0 60px 0;
  }
  .pubs-container {
	width:100vw;
	min-height:100vh;
	/* margin-top:100px; */
	background:white;
	padding: 50px 0 0 0 ;
	display: none;
  }

  .select-container {
	width:200px;
	position:absolute;
	margin-left:100px;
  }

  .circos-select {
	margin-top: 200px;
  }

  .plot-container {
	width: 100vw;
	display:flex;
	margin-left:5vw;
	justify-content: center;
	align-items: center;
  }

  /* utils */
  .loading {
	display: block;
	text-align:center;
  }
`;

function CustomMarker({ size, color }) {
	return (
		<svg
			viewBox="0 0 24 24"
			width={size}
			height={size}
			style={{
				fill: color,
				stroke: '#FFF',
				strokeWidth: 1,
				transform: 'translate(-30px, -30px)',
			}}
		>
			<path d="M12 2c-4.41 0-8 3.59-8 8 0 3.86 6.75 13.12 7.41 14.35.19.25.47.39.76.39s.57-.14.76-.39C13.25 23.12 20 13.86 20 10c0-4.41-3.59-8-8-8zm0 11.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
		</svg>
	);
}

const Container = styled.div`
  body {
	margin: 0;
  }

  svg {
	display: inline-block;
	vertical-align: middle;
  }

  path {
	fill: ${colors.map_lands};
  }
`;

const StyledDialog = styled.div`
  .title {
	font-size: 14px;
  }
  .list {
	font-size: 11px;
  }
  .section {
	max-height: 25vh;
	overflow-y: auto;
  }
`;

export {
	StyledPlot,
	CustomMarker,
	Container,
	StyledDialog
};