import React from 'react'
import toast from 'react-hot-toast';
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
const ProtectedRouteAd = ({ children }) => {

    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated);

    if(!isAuthenticated){
        return (<Navigate to="/login" replace></Navigate>)
    }
    else{
        return children
    }
}

export default ProtectedRouteAd