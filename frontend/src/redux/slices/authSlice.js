import {createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated : !!Cookies.get("token"),
    },
    reducers: {
        login: (state, action)=>{
            state.isAuthenticated = true
        },
        logout: (state, action)=>{
            state.isAuthenticated = false;
            Cookies.remove("token");
        }
    },
    
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;