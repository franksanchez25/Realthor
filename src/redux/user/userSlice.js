import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    error: [],
    loading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
        },
        signInFailure: (state, action)=> {
           state.error = action.payload;
           state.loading = false;     
        },
        startUserUpdate: (state, action)=>{
            state.loading = true;
        },
        updateUserSuccess: (state, action)=> {
            state.currentUser = action.payload,
            state.loading = false;
            state.error = null
        },
        updateUserFailure: (state, action)=> {
            state.loading = false;
            state.error = action.payload;
        },
         startDeleteUser: (state)=>{
            state.loading = true;
        },
         deleteUserSuccess: (state, action)=> {
            state.currentUser = null,
            state.loading = false;
            state.error = null
        },
         deleteUserFailure: (state, action)=> {
            state.loading = false;
            state.error = action.payload;
        },
         startSignout: (state)=>{
            state.loading = true;
        },
         signOutSuccess: (state, action)=> {
            state.currentUser = null,
            state.loading = false;
            state.error = null
        },
         signOutFailure: (state, action)=> {
            state.loading = false;
            state.error = action.payload;
        },

    }
});

export const {  signInStart,
                signInSuccess,
                signInFailure, 
                startUserUpdate,
                updateUserSuccess,
                updateUserFailure,
                startDeleteUser,
                deleteUserSuccess,
                deleteUserFailure,
                startSignout,
                signOutSuccess,
                signOutFailure 
             } = userSlice.actions;

export default userSlice.reducer;

