import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userDetails: {}
    },
    reducers: {
        setUser: (state, action)=>{
            state.userDetails = action.payload
        },
        removeUser: (state, action)=>{
            state.userDetails ={}
        }
    }
})


export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;