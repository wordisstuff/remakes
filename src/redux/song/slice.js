import { createSlice } from '@reduxjs/toolkit';
import { getAllSongs, getMp3 } from './operation';
const INIT_STATE = {
    songs: null,
    loading: false,
    error: null,
    mp3Link: null,
};

const songSlice = createSlice({
    name: 'song',
    initialState: INIT_STATE,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getMp3.fulfilled, (state, action) => {
                state.loading = false;
                state.mp3Link = action.payload.mp3Link;
            })
            .addCase(getAllSongs.pending, state => {
                (state.loading = true), (state.error = null);
            })
            .addCase(getAllSongs.fulfilled, (state, action) => {
                state.loading = false;
                state.songs = action.payload.data;
            })
            .addCase(getAllSongs.rejected, (state, action) => {
                (state.loading = false), (state.error = action.payload);
            });
    },
});

export const songReducer = songSlice.reducer;
