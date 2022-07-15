import * as types from '../constants/search';

const initState = {
    data: [],
};

export const searchReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_RESULT_SEARCH:
            return {
                ...state,
                data: [...action.payload]
            };
        default:
            return state;
    }
};