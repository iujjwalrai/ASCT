import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from 'react-router-dom';
import { verifyAuth } from '../redux/slices/authSlice';

const ProtectedRouteAd = ({ children }) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [loading, setLoading] = useState(true); // Track verification status

    useEffect(() => {
        const checkAuth = async () => {
            await dispatch(verifyAuth()); // Verify session from backend
            setLoading(false); // Stop loading after verification
        };

        if (!isAuthenticated) {
            checkAuth();
        } else {
            setLoading(false); // No need to verify if already authenticated
        }
    }, [dispatch, isAuthenticated]);

    if (loading) {
        return <div>Loading...</div>; // Show a loading state during verification
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRouteAd;
