import { createSlice } from '@reduxjs/toolkit';
import { currentUser, login, registerUser, updateUser } from './operation.js';
import { logOutUser } from '../auth/operation.js';

export const INIT_STATE = {
    user: {
        name: null,
        email: null,
        gender: null,
        photo: null,
        verifyByEmail: false,
    },
    token: null,
    refreshToken: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
    googleUrl: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: INIT_STATE,
    reducers: {
        setToken(state, action) {
            console.log(action.payload.token);
            state.token = action.payload.token;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log(action);
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log(action.payload);
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
            })
            .addCase(logOutUser.fulfilled, () => {
                return INIT_STATE;
            })
            .addCase(currentUser.pending, state => {
                state.isRefreshing = true;
            })
            .addCase(currentUser.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.isRefreshing = false;
            })
            .addCase(currentUser.rejected, state => {
                state.isRefreshing = false;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                console.log(action.payload.user);
                state.user = action.payload.user;
            });
    },
});

export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
