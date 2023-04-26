import React from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SwipeableViews from 'react-swipeable-views';
import Box from '@mui/material/Box';
import colors from '../../../../styles/colors';
import {useTheme} from '@emotion/react';
import styled from 'styled-components';

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


function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 1}}>
					{children}
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

const EnterByForm = () => {
	return(
		<div id="body-container">
			<div className="form-container">
				<form acceptCharset="utf-8">
					<div className="number-group">
						<label htmlFor="quantity">Number of PIs (between 1 and 10):</label>
						<input type="number" className="quantity" name="quantity" min="1" max="10"/>
						<input type="button" className="number-submit" value="Submit"/>
						<span className="na">Not available.</span>
					</div>
					<div className="form-group">
						<label>Last Name</label>
						<small className="text-muted"><i>Example: </i>Haibe-Kains</small>
						<label>Pubmed Queries</label>
						<small className="text-muted">Get pubmed query from the url. eg)
							https://pubmed.ncbi.nlm.nih.gov/?term=Haibe-Kains+Benjamin[AU]</small>
						<small className="text-muted"><i>Example: </i>Haibe-Kains+Benjamin[AU]</small>
					</div>
					<div className="divider"></div>
					<div className="fill-container">

					</div>
					<div className="button-group">
						<input type="button" className="form-button example" value="Enter example"/>
						<input type="button" className="form-button clear" value="Clear"/>
						<input type="button" className="form-button submit" value="Submit data" disabled='true'/>
					</div>
				</form>
			</div>

			<div className="pubs-container formview">
				<div className="select-container formview">
					<label className="radio-container formview">Graph Network
						<input className="formview input-network" type="radio" checked="checked"
							name="plotview-formview" value="network"/>
						<span className="formview checkmark"></span>
					</label>
					<label className="formview radio-container">Upset Plot
						<input type="radio" name="plotview-formview" value="upset"/>
						<span className="formview checkmark"></span>
					</label>
					<label className="formview radio-container">Circos Plot
						<input type="radio" name="plotview-formview" value="circos"/>
						<span className="formview checkmark"></span>
					</label>
				</div>
				<div className="formview select-container circos-select">
					<label className="formview radio-container">Chord Width View
						<input className="formview input-network" type="radio" checked="checked"
							name="circosview-formview" value="original"/>
						<span className="formview checkmark"/>
					</label>
					<label className="formview radio-container">Opacity View
						<input type="radio" name="circosview-formview" value="gradation"/>
						<span className="formview checkmark"/>
					</label>
				</div>
				<div className="formview loading">Loading...</div>
				<div className="formview plot-container">
					<div className="formview" id="networkPlot"></div>
					<div className="formview" id="upsetPlot"></div>
					<div className="formview" id="circosPlot">
						<div className="formview" id="originalView"></div>
						<div className="formview" id="gradationView"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

const EnterbyCSV = () => {
	return(
		<div id="tabs-2">
			<div id="body-container">
				<div className="form-container">
					<form className="upload-form" acceptCharset="utf-8">
						<div className="form-group">
							<label>Please enter your CSV data below.</label>
							<small className="text-muted">Do not enter more than 20 rows.</small>
							<small className="text-muted">Remove the first row if your CSV has headers.</small>
							<small className="text-muted">Use first and last names - the script will remove the
								first names.</small>
							<small className="text-muted">Put the entire url - the script parses out the search
								term.</small>
						</div>
						<div className="divider"></div>
						<textarea className="csv-area" type="csv" placeholder="CSV data goes here"></textarea>
						<div className="button-group">
							<input type="button" className="form-button example-csv" value="Enter example"/>
							<input type="button" className="form-button submit-csv" value="Submit data"
								disabled='true'/>
						</div>
					</form>
				</div>

				<div className="pubs-container csv">
					<div className="select-container csv">
						<label className="radio-container csv">Graph Network
							<input className="input-network csv" type="radio" checked="checked"
								name="plotview-csv" value="network"/>
							<span className="checkmark csv"/>
						</label>
						<label className="radio-container csv">Upset Plot
							<input type="radio" name="plotview-csv" value="upset"/>
							<span className="checkmark csv"/>
						</label>
						<label className="radio-container csv">Circos Plot
							<input type="radio" name="plotview-csv" value="circos"/>
							<span className="checkmark csv"/>
						</label>
					</div>
					<div className="csv select-container circos-select">
						<label className="csv radio-container">Chord Width View
							<input className="csv input-network" type="radio" checked="checked"
								name="circosview-csv" value="original"/>
							<span className="csv checkmark"/>
						</label>
						<label className="csv radio-container">Opacity View
							<input type="radio" name="circosview-csv" value="gradation"/>
							<span className="csv checkmark"/>
						</label>
					</div>
					<div className="csv loading">Loading...</div>
					<div className="csv plot-container">
						<div className="csv" id="networkPlot"></div>
						<div className="csv" id="upsetPlot"></div>
						<div className="csv" id="circosPlot">
							<div className="csv" id="originalView"></div>
							<div className="csv" id="gradationView"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const EnterbyLab = () => {
	return(
		<div id="tabs-3">
			<div id="body-container">
				<div className="form-container">
					<form className="upload-form" acceptCharset="utf-8">
						<div className="form-group">
							<label>Please enter your CSV data below - PI in the first input and collaborators in
								the second input.</label>
							<small className="text-muted">Remove the first row if your CSV has headers.</small>
							<small className="text-muted">Use first and last names - the script will remove the
								first names.</small>
							<small className="text-muted">Put the entire url - the script parses out the search
								term.</small>
						</div>
						<div className="divider"></div>
						<textarea className="labcsv-area pi" type="labcsv"
							placeholder="CSV data for your PI goes here"></textarea>
						<textarea className="labcsv-area collaborators" type="labcsv"
							placeholder="CSV data for the collaborators go here"></textarea>
						<div className="button-group">
							<input type="button" className="form-button example-labcsv" value="Enter example"/>
							<input type="button" className="form-button submit-labcsv" value="Submit data"
								disabled='true'/>
						</div>
					</form>
				</div>

				<div className="pubs-container labcsv">
					<div className="select-container labcsv">
						<label className="radio-container labcsv">Graph Network
							<input className="input-network labcsv" type="radio" checked="checked"
								name="plotview-labcsv" value="network"/>
							<span className="checkmark labcsv"/>
						</label>
						<label className="radio-container labcsv">Circos Plot
							<input type="radio" name="plotview-labcsv" value="circos"/>
							<span className="checkmark labcsv"/>
						</label>
					</div>
					<div className="labcsv select-container circos-select">
						<label className="labcsv radio-container">Chord Width View
							<input className="labcsv input-network" type="radio" checked="checked"
								name="circosview-labcsv" value="original"/>
							<span className="labcsv checkmark"/>
						</label>
						<label className="labcsv radio-container">Opacity View
							<input type="radio" name="circosview-labcsv" value="gradation"/>
							<span className="labcsv checkmark"/>
						</label>
						<button>
							<a id="downloadOriginal" href="#">Download Chord View</a>
						</button>
						<button>
							<a id="downloadGradation" href="#">Download Gradation View</a>
						</button>
					</div>
					<div className="labcsv loading">Loading...</div>
					<div className="labcsv plot-container">
						<div className="labcsv" id="networkPlot"></div>
						<div className="labcsv" id="circosPlot">
							<div className="labcsv" id="originalView"></div>
							<div className="labcsv" id="gradationView"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const CollaborationPlot = () => {
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	return (
		<StyledPlot>
			<AppBar
				position="static"
				sx={{color: `${colors.tab_bg}`, background: `${colors.white_background}`}}
			>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor={'primary'}
					textColor="inherit"
				>
					<Tab label="Enter by form" {...a11yProps(0)} />
					<Tab label="Enter by CSV" {...a11yProps(1)} />
					<Tab label="Enter by lab" {...a11yProps(2)} />
				</Tabs>
			</AppBar>
			<SwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel value={value} index={0} dir={theme.direction}>
					<EnterByForm/>
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<EnterbyCSV/>
				</TabPanel>
				<TabPanel value={value} index={2} dir={theme.direction}>
					<EnterbyLab/>
				</TabPanel>
			</SwipeableViews>
		</StyledPlot>
	);
};

export default CollaborationPlot;
