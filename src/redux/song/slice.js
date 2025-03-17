import { createSlice } from '@reduxjs/toolkit';
import { getAllSongs, getMp3 } from './operation';
const INIT_STATE = {
    songs: null,
    loading: false,
    error: null,
    mp3: [],
};

const songSlice = createSlice({
    name: 'song',
    initialState: INIT_STATE,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getMp3.fulfilled, (state, action) => {
                state.loading = false;
                if (
                    !state.mp3.some(
                        item => item.mp3Name === action.payload.mp3Name,
                    )
                ) {
                    state.mp3.push({
                        mp3Link: action.payload.data.mp3Link,
                        mp3Name: action.payload.mp3Name,
                    });
                } else {
                    console.warn(
                        `MP3 with name "${action.payload.mp3Name}" already exists.`,
                    );
                }
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
