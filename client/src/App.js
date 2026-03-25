import React from 'react';
import Routes from './routes/Routes';
import GlobalStyles from './styles/GlobalStyles';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

function App() {
	return (
		<>
			<GlobalStyles />
			<Routes />
		</>
	);
}

export default App;
