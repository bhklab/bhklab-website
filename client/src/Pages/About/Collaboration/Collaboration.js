import Layout from '../../../Components/Utils/Layout';
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import CollaborationMap from "./CollaborationComponents/CollaborationMap";
import Container from "@mui/material/Container";
import colors from "../../../styles/colors";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SwipeableViews from "react-swipeable-views";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material/styles";
import CollaborationPlot from "./CollaborationComponents/CollaborationPlot/CollaborationPlot";


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


const Collaboration = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return(
        <Layout>
            <Container>
                <Box sx={{ width: '100%' }}>
                    <AppBar position="static" style={{ background: '#2E3B55'}}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            variant="fullWidth"
                        >
                            <Tab label="Collaboration Map" {...a11yProps(0)} />
                            <Tab label="Collaboration Plot" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <CollaborationMap/>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <CollaborationPlot/>
                        </TabPanel>
                    </SwipeableViews>
                </Box>

            </Container>
        </Layout>
    );
}

export default Collaboration;
