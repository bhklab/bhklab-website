import React, { useContext, useState } from 'react';
import Container from '@mui/material/Container';
import Layout from '../../Components/Utils/Layout';
import AdminPage from './AdminComponents/AdminForm';
import { StyledLogin } from '../../styles/StyledLoginForm';
import useAuth from '../../hooks/useAuth';
import AuthContext from '../../hooks/Contexts';

function Admin() {
	const { admin } = useContext(AuthContext);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { submitAdmin } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault(); // prevent refresh
		submitAdmin({ username, password }, window.location);
	};

	return (
		<Layout>
			<Container>
				<div>
					{!admin
						? (
							<StyledLogin>
								<form className="login" onSubmit={handleSubmit}>
									<h3>Login</h3>
									<label>User name:</label>
									<input
										type="username"
										onChange={(e) => setUsername(e.target.value)}
										value={username}
									/>
									<label>Password:</label>
									<input
										type="password"
										onChange={(e) => setPassword(e.target.value)}
										value={password}
									/>
									<button>Login</button>
								</form>
							</StyledLogin>
						)
						:						<AdminPage />}
				</div>
			</Container>
		</Layout>
	);
}

export default Admin;
