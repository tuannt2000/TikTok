import * as types from '../constants/video';

const initState = {
    list_video: [],
    list_video_following: [],
    my_video: [],
    message: '',
    list_video_detail: [],
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
        case types.SET_LIST_VIDEO_DETAIL:
            return {
                ...state,
                list_video_detail: action.payload.list_video_detail,
                video_detail: action.payload.data
            }
        case types.SET_VIDEO_DETAIL:
            return {
                ...state,
                video_detail: action.payload
            }
        case types.SET_VIDEO_USER_FOLLOW:
            const new_list_video = state.list_video.map(result => {
                if (result.user.id === action.payload) {
                    result.user.following = !result.user.following;
                }

                return result;
            })

            const new_list_video_following = state.list_video_following.map(result => {
                if (result.user.id === action.payload) {
                    result.user.following = !result.user.following;
                }

                return result;
            })

            return {
                ...state,
                list_video: new_list_video,
                list_video_following: new_list_video_following
            }
        default:
            return state;
    }
};