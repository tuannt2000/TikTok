import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    login: false
};

const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        checkLogin: state => {
            state.login = true;
        },
    }
});

export const { checkLogin } = loginSlice.actions;
export default loginSlice.reducer;