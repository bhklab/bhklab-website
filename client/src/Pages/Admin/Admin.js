import React, {useEffect, useState} from 'react';
import Layout from '../../Components/Utils/Layout';
import Container from "@mui/material/Container";
import AdminPage from "./AdminComponents/AdminForm";
import {StyledLogin} from '../../styles/StyledLoginForm';


const Admin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [values, setValues] = React.useState({
        username: '',
        password: '',
        // correctUsername: 'weTheBHKLabAdmins',
        correctUsername: 'admin',
        correctPass: '1234',
        incorrectPassword: false,
        showPassword: false,
        showDiv: false,
    });


    const handleSubmit = async(e)=> {
        e.preventDefault(); //prevent refresh
        setValues({...values, "username": username, "password": password})
        e.preventDefault();
        // submitAdmin(admin, location);
    }

    const handleKeyPress = (e) => {
        if (values.password === values.correctPass && values.username === values.correctUsername) {
            setValues({
                ...values, showDiv: true, incorrectPassword: false,
            });

        }
    };

    useEffect(() => {
        handleKeyPress();
        }, [values.password]);

    return(
        <Layout>
            <Container >
                <div>
                    {!values.showDiv ?
                        <StyledLogin>
                            <form className="login" onSubmit={handleSubmit}>
                                <h3>Login</h3>
                                <label>User name:</label>
                                <input
                                    type="username"
                                    onChange={(e)=> setUsername(e.target.value)}
                                    value={username}
                                />
                                <label>Password:</label>
                                <input
                                    type="password"
                                    onChange={(e)=> setPassword(e.target.value)}
                                    value={password}
                                />
                                <button>Login</button>
                            </form>
                        </StyledLogin>
                    :
                        <AdminPage/>
                    }
                </div>
            </Container>
        </Layout>
    );
}

export default Admin;
