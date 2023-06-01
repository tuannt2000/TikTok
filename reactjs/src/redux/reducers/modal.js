import * as types from '../constants/modal';

const initState = {
    modalLogin: false,
    modelShare: false
};

export const modalReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_MODAL_LOGIN:
            return {
                ...state,
                modalLogin: action.payload
            };
        case types.SET_MODAL_SHARE:
            return {
                ...state,
                modelShare: action.payload
            };
        default:
            return state;
    }
};