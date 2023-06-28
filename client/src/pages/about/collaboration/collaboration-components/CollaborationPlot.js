import React from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SwipeableViews from 'react-swipeable-views';
import Box from '@mui/material/Box';
import { useTheme } from '@emotion/react';
import colors from '../../../../styles/colors';
import StyledPlot from './StyledCollaborations';

function TabPanel(props) {
	const {
		children, value, index, ...other
	} = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 1 }}>
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

function EnterByForm() {
	return (
		<div id="body-container">
			<div className="form-container">
				<form acceptCharset="utf-8">
					<div className="number-group">
						<label htmlFor="quantity">Number of PIs (between 1 and 10):</label>
						<input type="number" className="quantity" name="quantity" min="1" max="10" />
						<input type="button" className="number-submit" value="Submit" />
						<span className="na">Not available.</span>
					</div>
					<div className="form-group">
						<label>Last Name</label>
						<small className="text-muted">
							<i>Example: </i>
							Haibe-Kains
						</small>
						<label>Pubmed Queries</label>
						<small className="text-muted">
							Get pubmed query from the url. eg)
							https://pubmed.ncbi.nlm.nih.gov/?term=Haibe-Kains+Benjamin[AU]
						</small>
						<small className="text-muted">
							<i>Example: </i>
							Haibe-Kains+Benjamin[AU]
						</small>
					</div>
					<div className="divider" />
					<div className="fill-container" />
					<div className="button-group">
						<input type="button" className="form-button example" value="Enter example" />
						<input type="button" className="form-button clear" value="Clear" />
						<input type="button" className="form-button submit" value="Submit data" disabled="true" />
					</div>
				</form>
			</div>

			<div className="pubs-container formview">
				<div className="select-container formview">
					<label className="radio-container formview">
						Graph Network
						<input
							className="formview input-network"
							type="radio"
							checked="checked"
							name="plotview-formview"
							value="network"
						/>
						<span className="formview checkmark" />
					</label>
					<label className="formview radio-container">
						Upset Plot
						<input type="radio" name="plotview-formview" value="upset" />
						<span className="formview checkmark" />
					</label>
					<label className="formview radio-container">
						Circos Plot
						<input type="radio" name="plotview-formview" value="circos" />
						<span className="formview checkmark" />
					</label>
				</div>
				<div className="formview select-container circos-select">
					<label className="formview radio-container">
						Chord Width View
						<input
							className="formview input-network"
							type="radio"
							checked="checked"
							name="circosview-formview"
							value="original"
						/>
						<span className="formview checkmark" />
					</label>
					<label className="formview radio-container">
						Opacity View
						<input type="radio" name="circosview-formview" value="gradation" />
						<span className="formview checkmark" />
					</label>
				</div>
				<div className="formview loading">Loading...</div>
				<div className="formview plot-container">
					<div className="formview" id="networkPlot" />
					<div className="formview" id="upsetPlot" />
					<div className="formview" id="circosPlot">
						<div className="formview" id="originalView" />
						<div className="formview" id="gradationView" />
					</div>
				</div>
			</div>
		</div>
	);
}

function EnterbyCSV() {
	return (
		<div id="tabs-2">
			<div id="body-container">
				<div className="form-container">
					<form className="upload-form" acceptCharset="utf-8">
						<div className="form-group">
							<label>Please enter your CSV data below.</label>
							<small className="text-muted">Do not enter more than 20 rows.</small>
							<small className="text-muted">Remove the first row if your CSV has headers.</small>
							<small className="text-muted">
								Use first and last names - the script will remove the
								first names.
							</small>
							<small className="text-muted">
								Put the entire url - the script parses out the search
								term.
							</small>
						</div>
						<div className="divider" />
						<textarea className="csv-area" type="csv" placeholder="CSV data goes here" />
						<div className="button-group">
							<input type="button" className="form-button example-csv" value="Enter example" />
							<input
								type="button"
								className="form-button submit-csv"
								value="Submit data"
								disabled="true"
							/>
						</div>
					</form>
				</div>

				<div className="pubs-container csv">
					<div className="select-container csv">
						<label className="radio-container csv">
							Graph Network
							<input
								className="input-network csv"
								type="radio"
								checked="checked"
								name="plotview-csv"
								value="network"
							/>
							<span className="checkmark csv" />
						</label>
						<label className="radio-container csv">
							Upset Plot
							<input type="radio" name="plotview-csv" value="upset" />
							<span className="checkmark csv" />
						</label>
						<label className="radio-container csv">
							Circos Plot
							<input type="radio" name="plotview-csv" value="circos" />
							<span className="checkmark csv" />
						</label>
					</div>
					<div className="csv select-container circos-select">
						<label className="csv radio-container">
							Chord Width View
							<input
								className="csv input-network"
								type="radio"
								checked="checked"
								name="circosview-csv"
								value="original"
							/>
							<span className="csv checkmark" />
						</label>
						<label className="csv radio-container">
							Opacity View
							<input type="radio" name="circosview-csv" value="gradation" />
							<span className="csv checkmark" />
						</label>
					</div>
					<div className="csv loading">Loading...</div>
					<div className="csv plot-container">
						<div className="csv" id="networkPlot" />
						<div className="csv" id="upsetPlot" />
						<div className="csv" id="circosPlot">
							<div className="csv" id="originalView" />
							<div className="csv" id="gradationView" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function EnterbyLab() {
	return (
		<div id="tabs-3">
			<div id="body-container">
				<div className="form-container">
					<form className="upload-form" acceptCharset="utf-8">
						<div className="form-group">
							<label>
								Please enter your CSV data below - PI in the first input and collaborators in
								the second input.
							</label>
							<small className="text-muted">Remove the first row if your CSV has headers.</small>
							<small className="text-muted">
								Use first and last names - the script will remove the
								first names.
							</small>
							<small className="text-muted">
								Put the entire url - the script parses out the search
								term.
							</small>
						</div>
						<div className="divider" />
						<textarea
							className="labcsv-area pi"
							type="labcsv"
							placeholder="CSV data for your PI goes here"
						/>
						<textarea
							className="labcsv-area collaborators"
							type="labcsv"
							placeholder="CSV data for the collaborators go here"
						/>
						<div className="button-group">
							<input type="button" className="form-button example-labcsv" value="Enter example" />
							<input
								type="button"
								className="form-button submit-labcsv"
								value="Submit data"
								disabled="true"
							/>
						</div>
					</form>
				</div>

				<div className="pubs-container labcsv">
					<div className="select-container labcsv">
						<label className="radio-container labcsv">
							Graph Network
							<input
								className="input-network labcsv"
								type="radio"
								checked="checked"
								name="plotview-labcsv"
								value="network"
							/>
							<span className="checkmark labcsv" />
						</label>
						<label className="radio-container labcsv">
							Circos Plot
							<input type="radio" name="plotview-labcsv" value="circos" />
							<span className="checkmark labcsv" />
						</label>
					</div>
					<div className="labcsv select-container circos-select">
						<label className="labcsv radio-container">
							Chord Width View
							<input
								className="labcsv input-network"
								type="radio"
								checked="checked"
								name="circosview-labcsv"
								value="original"
							/>
							<span className="labcsv checkmark" />
						</label>
						<label className="labcsv radio-container">
							Opacity View
							<input type="radio" name="circosview-labcsv" value="gradation" />
							<span className="labcsv checkmark" />
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
						<div className="labcsv" id="networkPlot" />
						<div className="labcsv" id="circosPlot">
							<div className="labcsv" id="originalView" />
							<div className="labcsv" id="gradationView" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function CollaborationPlot() {
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
				sx={{ color: `${colors.tab_bg}`, background: `${colors.white_color}` }}
			>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
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
					<EnterByForm />
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<EnterbyCSV />
				</TabPanel>
				<TabPanel value={value} index={2} dir={theme.direction}>
					<EnterbyLab />
				</TabPanel>
			</SwipeableViews>
		</StyledPlot>
	);
}

export default CollaborationPlot;
