import * as types from '../constants/video';

const initState = {
    list_video: []
};

export const videoReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_LIST_VIDEO:
            return {
                ...state,
                list_video: [...action.payload]
            }
        default:
            return state;
    }
};