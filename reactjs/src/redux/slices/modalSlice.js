import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modalLogin: false,
    modalSignup: false
};

const modalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        setModalLogin: state => {
            state.modalLogin = !state.modalLogin;
        },
        setModalSignup: state => {
            state.modalSignup = !state.modalSignup;
        },
    }
});

export const { setModalLogin, setModalSignup } = modalSlice.actions;
export default modalSlice.reducer;