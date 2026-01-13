/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthContext from '../hooks/Contexts';

import {
	Home,
	Presentations,
	Research,
	IndivResearch,
	Publications,
	Software,
	SingleMemberInformation,
	Contact,
	LabMembers,
	Collaboration,
	JoinUs,
	SocialMediaAccounts
} from '../pages/Index';
import useFindAdmin from '../hooks/useFindAdmin';

function PublicRoutes() {
	const {
		admin, setAdmin, loading, checkSession,
	} = useFindAdmin();
	return (
		<Router scrollRestoration={false}>
			<AuthContext.Provider value={{
				admin, setAdmin, loading, checkSession,
			}}
			>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/presentations" element={<Presentations />} />
					<Route path="/research" element={<Research />} />
					<Route path="/research/:token" element={<IndivResearch />} />
					<Route path="/publications" element={<Publications />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/people" element={<LabMembers />} />
					<Route path="/people/:name" element={<SingleMemberInformation />} />
					<Route path="/collaboration" element={<Collaboration />} />
					<Route path="/positions" element={<JoinUs />} />
					<Route path="/software" element={<Software />} />
					<Route path="/socials" element={<SocialMediaAccounts />} />
				</Routes>
			</AuthContext.Provider>
		</Router>
	);
}

export default PublicRoutes;
