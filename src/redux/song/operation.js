import { createAsyncThunk } from "@reduxjs/toolkit";


export const getAllSongs = createAsyncThunk(
    'song/getAllSongs',
    async (_,{rejectWithValue})
)