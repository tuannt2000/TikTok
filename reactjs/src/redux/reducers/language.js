import * as types from '../constants/discove';

const initState = {
    data: [],
};

export const languageReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_ALL_DISCOVE:
            return {
                ...state,
                data: [...action.payload]
            };
        default:
            return state;
    }
};