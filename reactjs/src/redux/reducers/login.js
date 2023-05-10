import * as types from '../constants/login';

const initState = {
    data: {},
    loginSuccess: false,
    accessToken: "",
    loading: false
};

export const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload
            }
        case types.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
};