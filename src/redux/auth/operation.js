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
export const updateUser = createAsyncThunk(
    'auth/update',
    async (formData, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            console.log(token);
            if (!token) {
                return rejectWithValue(null);
            }
            setAuthHeader(token);
            console.log(formData);
            const { data } = await songApi.patch('/auth/update', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('DATA OPER', data);
            return data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    },
);
export const byProject = createAsyncThunk(
    'auth/byProject',
    async (project, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const token = auth.token;
            console.log(token);
            if (!token) {
                return rejectWithValue(null);
            }
            setAuthHeader(token);
            console.log(project);
            const { data } = await songApi.post('/auth/byProject', project);
            console.log('DATA OPER', data);
            return data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    },
);
