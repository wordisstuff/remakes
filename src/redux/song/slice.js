import { createSlice } from "@reduxjs/toolkit";
const INIT_STATE = {
    songs:null,
    loading:false,
    error:null
}

const songSlice = createSlice({
name:"song",
initialState:INIT_STATE,
reducers:{

},
extraReducers: builder => {
builder
.addCase(getSongs.pending,(state) => {
    state.loading = true,
    state.error = null
})
.addCase(getSongs.fulfield,(state,action) => {
    state.loading = false
    state.songs = action.payload
})
.addCase(getSongs.reject,(state) => {
    state.loading = false,
    state.error = action.payload
})
}
})

export const songReducer =  songSlice.reducer;