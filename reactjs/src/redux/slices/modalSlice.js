import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modalLogin: false,
    modalSignup: false
};

const modalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        showModalLogin: state => {
            state.modalLogin = true;
        },
        hideModalLogin: state => {
            state.modalLogin = false;
        },
        showModalSignup: state => {
            state.modalSignup = true;
        },
        hideModalSignup: state => {
            state.modalSignup = false;
        },
    }
});

export const { showModalLogin, hideModalLogin, showModalSignup, hideModalSignup } = modalSlice.actions;
export default modalSlice.reducer;