import * as types from '../constants/language';

const initState = {
    data: [],
};

export const languageReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_ALL_LANGUAGE:
            return {
                ...state,
                data: [...action.payload]
            };
        default:
            return state;
    }
};