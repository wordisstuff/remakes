import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        modalType: null,
    },
    reducers: {
        openModal(state, action) {
            console.log(action.payload);
            state.isOpen = true;
            state.modalType = action.payload;
        },
        closeModal(state) {
            state.isOpen = false;
            state.modalType = null;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
