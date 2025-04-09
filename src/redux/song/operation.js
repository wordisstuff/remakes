import { createAsyncThunk } from '@reduxjs/toolkit';
import { songApi } from '../../axios/axios.js';

export const addSong = createAsyncThunk(
    'song/addSong',
    async (formData, { rejectWithValue }) => {
        console.log(formData);
        try {
            const { data } = await songApi.post('/songs/addSong', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(data);
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    },
);

export const getAllSongs = createAsyncThunk(
    'song/getAllSongs',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await songApi.get('/songs');
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    },
);

export const getMp3 = createAsyncThunk(
    'song/getMp3',
    async (mp3Name, { rejectWithValue }) => {
        try {
            const { data } = await songApi.get(`/file/mp3/${mp3Name}`);
            console.log(data);
            return { data, mp3Name };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    },
);
