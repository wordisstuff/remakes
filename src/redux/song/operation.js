import { createAsyncThunk } from "@reduxjs/toolkit";
import { songApi } from "../../axios/axios";


export const getAllSongs = createAsyncThunk(
    'song/getAllSongs',
    async (_,{rejectWithValue}) =>{
        try{
            const {data} = await songApi.get()
            console.log(data)
            return data;
        }
        catch(err){

            return rejectWithValue(err.message);
        }
    }

)
