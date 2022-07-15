import * as types from '../constants/search';

const initState = {
    data: [],
    isLoading: false
};

export const searchReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_RESULT_SEARCH:
            return {
                ...state,
                data: [...action.payload.data],
                isLoading: action.payload.isLoading
            };
        default:
            return state;
    }
};