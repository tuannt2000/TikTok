import * as types from '../constants/video';

const initState = {
    list_video: [],
    list_video_following: [],
    my_video: [],
    my_video_like: [],
    message: '',
    list_video_detail: [],
    video_detail: {},
    report: {
        video_id: null,
        check: false
    },
    load_more: false,
    exist_data_list_video: true
};

export const videoReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_LIST_VIDEO:
            return {
                ...state,
                list_video: [...state.list_video, ...action.payload],
                list_video_following: []
            }
        case types.SET_LIST_VIDEO_FOLLOWING:
            return {
                ...state,
                list_video_following: [...state.list_video_following, ...action.payload],
                list_video: []
            }
        case types.SET_MY_VIDEO:
            return {
                ...state,
                my_video: [...action.payload]
            }
        case types.SET_MY_VIDEO_LIKE:
            return {
                ...state,
                my_video_like: [...action.payload]
            }
        case types.REMOVE_MY_VIDEO_LIKE:
            return {
                ...state,
                my_video_like: []
            }
        case types.SET_LIST_VIDEO_DETAIL:
            return {
                ...state,
                list_video_detail: action.payload.list_video_detail,
                video_detail: action.payload.data
            }
        case types.SET_VIDEO_DETAIL_WHEN_DELETE:
            const current_index_video_detail = state.list_video_detail.findIndex(element => element.id === action.payload.id);
            const list_video_detail_new = state.list_video_detail.filter(video => video.id !== action.payload.id);
            let video_detail_new;
            if (list_video_detail_new.length > 0) {
                video_detail_new = list_video_detail_new.length === 1 ? list_video_detail_new[0] : list_video_detail_new[current_index_video_detail];
            } else {
                video_detail_new = {};
            }
            const my_video_new = state.my_video.filter(video => video.id !== action.payload.id);

            return {
                ...state,
                list_video_detail: list_video_detail_new,
                my_video: my_video_new,
                video_detail: video_detail_new
            }
        case types.SET_VIDEO_DETAIL_WHEN_EDIT_SUCCESS:
            const video_id = action.payload.id;
            delete action.payload['id'];
            const list_video_detail_edit = state.list_video_detail.map(result => {
                if (result.id === video_id) {
                    result = {...result, ...action.payload}
                }

                return result;
            })
            
            return {
                ...state,
                my_video: list_video_detail_edit,
                list_video_detail: list_video_detail_edit,
                video_detail: {...state.video_detail, ...action.payload}
            }
        case types.SET_VIDEO_DETAIL:
            return {
                ...state,
                video_detail: action.payload
            }
        case types.SET_VIDEO_USER_FOLLOW:
            const new_list_video = state.list_video.map(result => {
                if (result.user.id === action.payload) {
                    result.is_user_following = !result.is_user_following;
                }

                return result;
            })

            const new_list_video_following = state.list_video_following.map(result => {
                if (result.user.id === action.payload) {
                    result.is_user_following = !result.is_user_following;
                }

                return result;
            })

            return {
                ...state,
                list_video: new_list_video,
                list_video_following: new_list_video_following
            }
        case types.SET_MY_VIDEO_FOLLOW:
            const new_my_video = state.my_video.map(result => {
                if (result.user.id === action.payload) {
                    result.is_user_following = !result.is_user_followingg;
                }

                return result;
            });

            return {
                ...state,
                my_video: new_my_video
            }
        case types.SET_REPORT_VIDEO:
            return {
                ...state,
                report: action.payload
            }
        case types.SET_LOAD_MORE:
            return {
                ...state,
                load_more: action.payload
            }
        case types.SET_EXIST_DATA_LIST_VIDEO:
            return {
                ...state,
                exist_data_list_video: action.payload
            }
        case types.CLEAR_LIST_VIDEO:
            return {
                ...state,
                list_video: [],
                list_video_following: []
            }
        default:
            return state;
    }
};