import * as types from '../constants/video';

export const listVideo = () => ({
    type: types.GET_LIST_VIDEO
});

export const setListVideo = ( data ) => ({
    type: types.SET_LIST_VIDEO,
    payload: data
});

export const listVideoFollowing = () => ({
    type: types.GET_LIST_VIDEO_FOLLOWING
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

export const getMyVideoLike = (data) => ({
    type: types.GET_MY_VIDEO_LIKE,
    payload: data
});

export const setMyVideoLike = ( data ) => ({
    type: types.SET_MY_VIDEO_LIKE,
    payload: data
});

export const uploadVideo = ( data ) => ({
    type: types.UPLOAD_VIDEO,
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

export const setReportVideo = ( data = false ) => ({
    type: types.SET_REPORT_VIDEO,
    payload: data
});