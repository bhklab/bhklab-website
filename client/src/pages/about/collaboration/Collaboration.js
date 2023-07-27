import React from 'react';
import Container from '@mui/material/Container';
// import SwipeableViews from 'react-swipeable-views';
// import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
// import CollaborationPlot from './CollaborationComponents/CollaborationPlot';
import colors from '../../../styles/colors';
// import CollaborationMap from './CollaborationComponents/CollaborationMap';
import Layout from '../../../components/utils/Layout';
import SlideButton from '../../../styles/StyledButton';
// import CollectionMapBubble from './CollaborationComponents/CollectionMapBubble';

// function TabPanel(props) {
// 	const {
// 		children, value, index, ...other
// 	} = props;
// 	return (
// 		<div
// 			role="tabpanel"
// 			hidden={value !== index}
// 			id={`full-width-tabpanel-${index}`}
// 			aria-labelledby={`full-width-tab-${index}`}
// 			{...other}
// 		>
// 			{value === index && (
// 				<Box sx={{ p: 1 }}>
// 					{children}
// 				</Box>
// 			)}
// 		</div>
// 	);
// }

function Collaboration() {
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	return (
		<Layout>
			<div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
				<SlideButton
					style={{ left: '10px', color: `${value ? colors.dark_gray : colors.light_gray}` }}
					onClick={(e) => handleChange(e, 0)}
				>
					World Map
					{' '}
					<br />
					<ArrowBackIosRoundedIcon
						fontSize="large"
						sx={{ ':hover': { color: `${value && colors.darker_gray}` }, marginTop: '10px' }}
					/>
				</SlideButton>
				<Container>
					{/* <SwipeableViews
						axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
						index={value}
						onChangeIndex={handleChangeIndex}
					>
						<TabPanel value={value} index={0} dir={theme.direction}>
							<CollectionMapBubble />
							<CollaborationMap />
						</TabPanel>
						<TabPanel value={value} index={1} dir={theme.direction}>
							<CollaborationPlot />
						</TabPanel>
					</SwipeableViews> */}
				</Container>
				<SlideButton
					style={{ right: '10px', color: `${!value ? colors.dark_gray : colors.light_gray}` }}
					onClick={(e) => handleChange(e, 1)}
				>
					PubMed Plot
					<br />
					<ArrowForwardIosRoundedIcon
						fontSize="large"
						sx={{ ':hover': { color: `${!value && colors.darker_gray}` }, marginTop: '10px' }}
					/>
				</SlideButton>
			</div>
		</Layout>
	);
}

export default Collaboration;
