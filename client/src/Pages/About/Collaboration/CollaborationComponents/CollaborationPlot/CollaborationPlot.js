import React from 'react';
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SwipeableViews from "react-swipeable-views";
import Box from "@mui/material/Box";
import colors from "../../../../../styles/colors";
import {useTheme} from "@emotion/react";

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
        <div>
            <div className="button-group">
                <input type="button" className="form-button example" value="Enter example"/>
                <input type="button" className="form-button clear" value="Clear"/>
                <input type="button" className="form-button submit" value="Submit data" disabled={true}/>
            </div>
        </div>
    )
};

const EnterbyCSV = () => {
    return(
        <div>
            <div className="button-group">
                <input type="button" className="form-button example" value="Enter example"/>
                <input type="button" className="form-button clear" value="Clear"/>
                <input type="button" className="form-button submit" value="Submit data" disabled={true}/>
            </div>
        </div>
    )
};

const EnterbyLab = () => {
    return(
        <div>
            <div className="form-container">
                <form className="upload-form" acceptCharset="utf-8">
                    <div className="form-group">
                        <label>Please enter your CSV data below - PI in the first input and collaborators in the second
                            input.</label>
                        <small className="text-muted">Remove the first row if your CSV has headers.</small>
                        <small className="text-muted">Use first and last names - the script will remove the first
                            names.</small>
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
                        <input type="button" className="form-button submit-labcsv" value="Submit data" disabled='true'/>
                    </div>


                </form>
            </div>
        </div>
    )
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

        <Box sx={{bgcolor: `${colors.white}`}}>
            <AppBar position="static" style={{color: `${colors.blue_footer}`, background: `${colors.white}`}}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor={'secondary'}
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
        </Box>
    );
}

export default CollaborationPlot;
