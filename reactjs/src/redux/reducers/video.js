import * as types from '../constants/video';

const initState = {
    list_video: [],
    my_video: [],
    message: ''
};

export const videoReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_LIST_VIDEO:
            return {
                ...state,
                list_video: [...action.payload]
            }
        case types.SET_MY_VIDEO:
            return {
                ...state,
                my_video: [...action.payload]
            }
        case types.SET_MESSAGE_VIDEO:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
};