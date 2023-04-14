import * as types from '../constants/video';

const initState = {
    list_video: [],
    list_video_following: [],
    my_video: [],
    message: '',
    video_detail: {}
};

export const videoReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_LIST_VIDEO:
            return {
                ...state,
                list_video: [...action.payload]
            }
        case types.SET_LIST_VIDEO_FOLLOWING:
            return {
                ...state,
                list_video_following: [...action.payload]
            }
        case types.SET_MY_VIDEO:
            return {
                ...state,
                my_video: [...action.payload]
            }
        case types.SET_VIDEO_DETAIL:
            return {
                ...state,
                video_detail: action.payload
            }
        default:
            return state;
    }
};