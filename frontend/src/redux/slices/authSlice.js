import {createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let logoutTimer;
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated : false,
        loginTime: null,
    },
    reducers: {
        setAuth: (state, action)=>{
            state.isAuthenticated = action.payload.isAuthenticated;
            state.loginTime = action.payload.loginTime || null;
        },
        logout: (state, action)=>{
            state.isAuthenticated = false;
            state.loginTime = null;
            if (logoutTimer) clearTimeout(logoutTimer);
        }
    },
    
});

export const {setAuth, logout} = authSlice.actions;

export const verifyAuth = ()=> async(dispatch)=>{
    try{
        const response = await axios.get(`${process.env.REACT_APP_ASCT_BASE_API_URL}/api/v1/LoginPortal/advocate/verifyCookie`, {withCredentials: true});

        if(response.data.success){
            dispatch(
                setAuth({
                  isAuthenticated: true,
                  loginTime: Date.now(),
                })
              );
        } else{
            dispatch(logout());
            window.location.href = '/login';
        }
    }
    catch(error){
        dispatch(logout()); 
        window.location.href = '/login';
    }
}

export const scheduleAutoLogout = () => (dispatch) => {
    if (logoutTimer) clearTimeout(logoutTimer);
  
    logoutTimer = setTimeout(() => {
      dispatch(logout());
      alert("Session expired. You have been logged out.");
    }, 2 * 60 * 60 * 1000); 
};

export default authSlice.reducer;