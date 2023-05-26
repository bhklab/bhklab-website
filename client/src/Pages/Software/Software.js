/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import 'animate.css/animate.min.css';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import colors from '../../styles/colors';
import SlideButton from '../../styles/StyledButton';
import Packages from './Packages';
import WebApplications from './WebApplications';

const StyledContainer = styled.div`
	display: flex;
`;

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
			{
				value === index && (
					<Box sx={{ p: 1 }}>
						{children}
					</Box>
				)
			}
		</div>
	);
}

function Software() {
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};
	return (
		<StyledContainer>
			<SlideButton
				isActive={Boolean(value)}
				onClick={(e) => handleChange(e, 0)}
			>
				Web Apps
				<br />
				<ArrowBackIosRoundedIcon
					fontSize="large"
					sx={{ ':hover': { color: `${value && colors.darker_gray}` }, marginTop: '10px' }}
				/>
			</SlideButton>
			<Container>
				<SwipeableViews
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={value}
					onChangeIndex={handleChangeIndex}
				>
					<TabPanel value={value} index={0} dir={theme.direction}>
						<WebApplications />
					</TabPanel>
					<TabPanel value={value} index={1} dir={theme.direction}>
						<Packages />
					</TabPanel>
				</SwipeableViews>
			</Container>
			<SlideButton
				isActive={Boolean(!value)}
				onClick={(e) => handleChange(e, 1)}
			>
				Packages
				<br />
				<ArrowForwardIosRoundedIcon
					fontSize="large"
					sx={{ ':hover': { color: `${!value && colors.darker_gray}` }, marginTop: '10px' }}
				/>
			</SlideButton>
		</StyledContainer>
	);
}

export default Software;
