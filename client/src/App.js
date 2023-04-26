import React from 'react';
import Routes from './Routes/Routes';
import './styles/App.css';
import GlobalStyles from './styles/GlobalStyles.js';

function App() {
	return (
		<React.Fragment>
			<GlobalStyles />
			<Routes />
		</React.Fragment>
	);
}

export default App;

