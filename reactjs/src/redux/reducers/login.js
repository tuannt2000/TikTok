import * as types from '../constants/login';

const initState = {
    data: {},
    loginSuccess: false,
    showModalLogin: false
};

export const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loginSuccess: action.payload
            };
        case  types.SET_SHOW_MODAL_LOGIN:
            return {
                ...state,
                showModalLogin: action.payload
            };
        default:
            return state;
    }
};