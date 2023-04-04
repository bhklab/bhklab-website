import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Checks if an admin has a valid cookie when they arrive on the site.
 */
const useFindAdmin = () => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            try{
                const res = await axios.get('/api/admin/session');
                setAdmin(res.data);
            }catch(err){
                console.log('not logged in');
            }finally{
                setLoading(false);
            }
        }
        getSession();
    }, []);

    /**
     * Used before loading a restricted page.
     * Check if session is valid. If valid, loads the page.
     * If not valid, redirect to admin.
     * Prevents app from loading a restricted page if session is expired but local cookie is still set.
     * @param {*} history react-router's history object. Used to redirect to admin page.
     * @param {*} loadView a function to initialize the restricted view. Empty function by default
     */
    const checkSession = async (history, loadView=() => {}) => {
        const res = await axios.get('/api/admin/session');
        setAdmin(res.data);
        if(res.data){
            loadView();
        }else{
            history.push('/admin');
        }
    }

    return {
        admin,
        setAdmin,
        loading,
        setLoading,
        checkSession
    }
}

export default useFindAdmin;
