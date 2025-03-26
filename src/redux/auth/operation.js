import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { clearAuthHeader, setAuthHeader, songApi } from '../../axios/axios';

export const registerUser = createAsyncThunk(
    'auth/signup',
    async (formData, { rejectWithValue }) => {
        try {
            const { data } = await songApi.post('/auth/signup', formData);
            toast.success(data.message);
            return;
        } catch (e) {
            toast.error(e.response.data.data.message);
            return rejectWithValue(e.message);
        }
    },
);

export const logOutUser = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await songApi.post('/auth/logout');
            clearAuthHeader();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const login = createAsyncThunk(
    'auth/signin',
    async (formData, thunkAPI) => {
        console.log(formData);
        try {
            const { data } = await songApi.post('/auth/signin', formData);
            setAuthHeader(data.data.token);
            toast.success(data.message);
            console.log(data);
            return data.data;
        } catch (error) {
            toast.error(error.response.data.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    },
);

export const currentUser = createAsyncThunk(
    'auth/curent',
    async (_, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            if (!token) {
                return rejectWithValue(null);
            }
            setAuthHeader(token);
            const { data } = await songApi.get('/auth/current');
            console.log(data);
            return data;
        } catch {
            return rejectWithValue(null);
        }
    },
);
