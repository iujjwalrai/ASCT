import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from 'react-router-dom';
import { verifyAuth } from '../redux/slices/authSlice';

const ProtectedRouteAd = ({ children }) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const checkAuth = async () => {
            await dispatch(verifyAuth()); 
            setLoading(false); 
        };

        if (!isAuthenticated) {
            checkAuth();
        } else {
            setLoading(false); 
        }
    }, [dispatch, isAuthenticated]);

    if (loading) {
        return <div>Loading...</div>; 
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRouteAd;
