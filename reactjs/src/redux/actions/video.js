import * as types from '../constants/video';

export const listVideo = (data = {}) => ({
    type: types.GET_LIST_VIDEO,
    payload: data
});

export const setListVideo = ( data ) => ({
    type: types.SET_LIST_VIDEO,
    payload: data
});

export const getVideoById = ( id ) => ({
    type: types.GET_VIDEO_BY_ID,
    payload: id
});

export const listVideoFollowing = ( data ) => ({
    type: types.GET_LIST_VIDEO_FOLLOWING,
    payload: data
});

export const setListVideoFollowing = ( data ) => ({
    type: types.SET_LIST_VIDEO_FOLLOWING,
    payload: data
});

export const myVideo = (data) => ({
    type: types.GET_MY_VIDEO,
    payload: data
});

export const setMyVideo = ( data ) => ({
    type: types.SET_MY_VIDEO,
    payload: data
});

export const getMyVideoLike = () => ({
    type: types.GET_MY_VIDEO_LIKE,
});

export const removeMyVideoLike = () => ({
    type: types.REMOVE_MY_VIDEO_LIKE,
});

export const setMyVideoLike = ( data ) => ({
    type: types.SET_MY_VIDEO_LIKE,
    payload: data
});

export const uploadVideo = ( data ) => ({
    type: types.UPLOAD_VIDEO,
    payload: data
});

export const deleteVideo = ( data ) => ({
    type: types.DELETE_MY_VIDEO,
    payload: data
});

export const setVideoDetailWhenDelete = ( data ) => ({
    type: types.SET_VIDEO_DETAIL_WHEN_DELETE,
    payload: data
});

export const setVideoDetailWhenEdit = ( data ) => ({
    type: types.SET_VIDEO_DETAIL_WHEN_EDIT,
    payload: data
});

export const setVideoDetailWhenEditSuccess = ( data ) => ({
    type: types.SET_VIDEO_DETAIL_WHEN_EDIT_SUCCESS,
    payload: data
});

export const likeVideo = ( data ) => ({
    type: types.LIKE_VIDEO,
    payload: data
});

export const setListVideoDetail = ( data ) => ({
    type: types.SET_LIST_VIDEO_DETAIL,
    payload: data
});

export const setVideoDetail = ( data ) => ({
    type: types.SET_VIDEO_DETAIL,
    payload: data
});

export const setVideoUserFollow = ( data ) => ({
    type: types.SET_VIDEO_USER_FOLLOW,
    payload: data
});

export const setMyVideoFollow = ( data ) => ({
    type: types.SET_MY_VIDEO_FOLLOW,
    payload: data
});

export const setReportVideo = ( data = {} ) => ({
    type: types.SET_REPORT_VIDEO,
    payload: data
});

export const reportVideo = ( data = false ) => ({
    type: types.POST_REPORT_VIDEO,
    payload: data
});

export const shareVideo = ( data = {} ) => ({
    type: types.SHARE_VIDEO,
    payload: data
});

export const setLoadMore = ( data = true ) => ({
    type: types.SET_LOAD_MORE,
    payload: data
});

export const setExistDataListVideo = ( data = true ) => ({
    type: types.SET_EXIST_DATA_LIST_VIDEO,
    payload: data
});