import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
        modalType: null,
        content: null,
    },
    reducers: {
        openModal(state, action) {
            console.log(action.payload);
            const { type, content } = action.payload;
            state.isOpen = true;
            state.modalType = type;
            if (content) state.content = content;
        },
        closeModal(state) {
            state.isOpen = false;
            state.modalType = null;
            state.content = null;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
