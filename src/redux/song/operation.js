import { createAsyncThunk } from '@reduxjs/toolkit';
import { songApi } from '../../axios/axios.js';

export const getAllSongs = createAsyncThunk(
    'song/getAllSongs',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await songApi.get('/songs');
            console.log(data);
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    },
);
