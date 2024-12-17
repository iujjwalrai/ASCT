import React from 'react'
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
const ProtectedRouteAdmin = ({children}) => {
    const adminToken = Cookies.get("adminToken");

    if(!adminToken){
        return <Navigate to = "/adminLogin"/>
    }

    return children
}

export default ProtectedRouteAdmin