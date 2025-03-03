import { createSlice } from '@reduxjs/toolkit';
import { getAllSongs } from './operation';
const INIT_STATE = {
    songs: null,
    loading: false,
    error: null,
};

const songSlice = createSlice({
    name: 'song',
    initialState: INIT_STATE,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllSongs.pending, state => {
                (state.loading = true), (state.error = null);
            })
            .addCase(getAllSongs.fulfilled, (state, action) => {
                state.loading = false;
                state.songs = action.payload;
            })
            .addCase(getAllSongs.rejected, (state, action) => {
                (state.loading = false), (state.error = action.payload);
            });
    },
});

export const songReducer = songSlice.reducer;
