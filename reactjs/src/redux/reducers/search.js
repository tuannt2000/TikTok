import * as types from '../constants/search';

const initState = {
    data: [],
    isLoading: false,
    search_top_video: [],
    search_video: []
};

export const searchReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_RESULT_SEARCH:
            return {
                ...state,
                data: [...action.payload.data],
                isLoading: action.payload.isLoading
            };
        case types.SET_TOP_VIDEO:
            return {
                ...state,
                search_top_video: action.payload
            }
        case types.SET_SEARCH_VIDEO:
            return {
                ...state,
                search_video: action.payload
            }
        default:
            return state;
    }
};