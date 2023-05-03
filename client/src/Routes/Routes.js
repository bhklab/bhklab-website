import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthContext from '../hooks/Contexts';

import {
	Home,
	Dataset,
	Presentation,
	Research,
	IndivResearch,
	Papers,
	Equipments,
	Software,
	Contact,
	People,
	Member,
	Collaboration,
	JoinUs,
	Social,
	Admin,
} from '../Components/index';
import useFindAdmin from '../hooks/useFindAdmin';

function PublicRoutes() {
	const {
		admin, setAdmin, loading, checkSession,
	} = useFindAdmin();
	return (
		<Router>
			<AuthContext.Provider value={{
				admin, setAdmin, loading, checkSession,
			}}
			>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/datasets" element={<Dataset />} />
					<Route path="/presentations" element={<Presentation />} />
					<Route path="/research" element={<Research />} />
					<Route path="/research/:token" element={<IndivResearch />} />
					<Route path="/publications" element={<Papers />} />
					<Route path="/equipments" element={<Equipments />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/people" element={<People />} />
					<Route path="/people/:token" element={<Member />} />
					<Route path="/collaboration" element={<Collaboration />} />
					<Route path="/positions" element={<JoinUs />} />
					<Route path="/social" element={<Social />} />
					<Route path="/software" element={<Software />} />
					<Route path="/admin" element={<Admin />} />
					<>
						{
							true
                        && <Route path="/administration" element={<Admin />} />
						}
					</>
					<Route path="/administration" element={<Admin />} />
				</Routes>
			</AuthContext.Provider>
		</Router>
	);
}

export default PublicRoutes;
