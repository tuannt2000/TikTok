import * as types from '../constants/login';

const initState = {
    data: {},
    loginSuccess: false,
    accessToken: ""
};

export const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload
            }
        default:
            return state;
    }
};