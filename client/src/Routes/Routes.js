/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthContext from '../hooks/Contexts';

import {
	Home,
	Dataset,
	Presentations,
	Research,
	IndivResearch,
	Publications,
	Equipments,
	Software,
	Contact,
	LabMembers,
	Member,
	Collaboration,
	JoinUs,
	Social,
} from '../Pages/index';
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
					<Route path="/presentations" element={<Presentations />} />
					<Route path="/research" element={<Research />} />
					<Route path="/research/:token" element={<IndivResearch />} />
					<Route path="/publications" element={<Publications />} />
					<Route path="/equipments" element={<Equipments />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/people" element={<LabMembers />} />
					<Route path="/people/:token" element={<Member />} />
					<Route path="/collaboration" element={<Collaboration />} />
					<Route path="/positions" element={<JoinUs />} />
					<Route path="/social" element={<Social />} />
					<Route path="/software" element={<Software />} />
				</Routes>
			</AuthContext.Provider>
		</Router>
	);
}

export default PublicRoutes;
