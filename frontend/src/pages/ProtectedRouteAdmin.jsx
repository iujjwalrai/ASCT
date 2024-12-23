import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRouteAdmin = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                setLoading(true);
                const vap = await axios.get(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/adminPortal/admin/verifyCookie`, { withCredentials: true });
                if (vap.data.success) {
                    setIsAuth(true);
                }
                setLoading(false);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        };

        verifyAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuth ? children : <Navigate to="/adminLogin" />;
};

export default ProtectedRouteAdmin;
