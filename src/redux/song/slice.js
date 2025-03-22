import { createSlice } from '@reduxjs/toolkit';
import { getAllSongs, getMp3 } from './operation';
const INIT_STATE = {
    songs: null,
    loading: false,
    error: null,
    mp3: [],
    cart: [],
};

const songSlice = createSlice({
    name: 'song',
    initialState: INIT_STATE,
    reducers: {
        resetCart() {
            return INIT_STATE;
        },
        addToCart(state, action) {
            console.log(action.payload.songId);
            const cartObjIds = state.cart.map(i => i._id);
            console.log(cartObjIds);
            console.log(action.payload.songId);
            console.log(!cartObjIds.includes(action.payload.songId));

            if (!cartObjIds.includes(action.payload.songId)) {
                state.cart.push(
                    ...state.songs.filter(i =>
                        action.payload.songId.includes(i._id),
                    ),
                );
            } else {
                state.cart = state.cart.filter(
                    i => i._id !== action.payload.songId,
                );
            }
        },
    },
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

export const { addToCart, resetCart } = songSlice.actions;
