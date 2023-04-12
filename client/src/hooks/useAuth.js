import {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './Contexts';

/**
 * Custom hook to handle authentication.
 * @returns
 */
const useAuth = () => {
    const history = useNavigate();
    const [error, setError] = useState(false);
    const { setAdmin } = useContext(AuthContext);

    /**
     * Gets an admin, then pushes to another page based on location value
     * @param {*} location
     */
    const setAdminContext = async (location) => {
        const res = await axios.get('/api/admin/session');
        setAdmin(res.data);
        if(res.data){
            if (location.state && location.state.from){
                history(location.state.from);
            }else{
                history('/');
            }
        }else{
            console.log('authentication failed');
        }
    }

    /**
     * Submits admin data to be logged in or registered.
     * @param {*} admin admin data to be submitted (set in Authentication.js)
     * @param {*} location
     */
    const submitAdmin = async (admin, location) => {
        try{
            const res = await axios.post('/api/admin/login', admin);
            await setAdminContext(location);
            setAdmin(res);
            if(res){
                history('/admin');
            }else{
                console.log('authentication failed');
                setError(true);
            }
        }catch(err){
            console.log(err);
        }
    }

    const logoutAdmin = async () => {
        try{
            await axios.get(`/api/admin/logout`); // call API to reset cookie token
            setAdmin(null); // reset user in UserContext to null
            history('/admin'); // push to signin page
        }catch(err){
            console.log(err);
        }
    }

    return {
        submitAdmin,
        logoutAdmin,
        error
    }
}

export default useAuth;
