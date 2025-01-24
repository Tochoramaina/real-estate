import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error : null,
    loading : false
};
const UserSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        signInStart : (state) => {
            state.loading = true;
        },
        signInSuccess : (state,  action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null
        },
        signInFailure : (state, action) =>{
            state.error = action.payload;
            state.loading =false;
        },
        updatedUserStart : (state) => {
            state.loading = true
        },
        updatedUserSuccess : (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure : (state, action) => {
            state.error = action.payload;
            state.loading = false
        },
        deleteUserStart : (state) => {
            state.loading = true
        },
        deleteUserSuccess : (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure : (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOutUserStart : (state) => {
            state.loading = true
        },
        signOutUserSuccess : (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutUserFailure : (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});
export const {signInStart, signInSuccess, signInFailure, updateUserFailure, updatedUserSuccess, updatedUserStart, deleteUserStart, deleteUserFailure, deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess} = UserSlice.actions;
export default UserSlice.reducer;