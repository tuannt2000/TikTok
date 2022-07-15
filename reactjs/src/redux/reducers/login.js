import * as types from '../constants/login';

const initState = {
    data: {},
    loginSuccess: false
};

export const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loginSuccess: action.payload
            };
        default:
            return state;
    }
};