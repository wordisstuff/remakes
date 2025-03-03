import { createSlice } from '@reduxjs/toolkit';
import { login, registerUser } from './operation';
import { logOutUser } from '../auth/operation';

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
            });
    },
});

export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
