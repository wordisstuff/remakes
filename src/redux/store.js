import { configureStore } from "@reduxjs/toolkit";
import { songReducer } from "./song/slice";

export const store = configureStore({
reducer:{
    song:songReducer
}

})