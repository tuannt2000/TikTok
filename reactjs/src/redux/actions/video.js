import * as types from '../constants/video';

export const listVideo = () => ({
    type: types.GET_LIST_VIDEO
});

export const setListVideo = ( data ) => ({
    type: types.SET_LIST_VIDEO,
    payload: data
});

export const myVideo = () => ({
    type: types.GET_MY_VIDEO
});

export const setMyVideo = ( data ) => ({
    type: types.SET_MY_VIDEO,
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

export const setMessageVideo = ( data ) => ({
    type: types.SET_MESSAGE_VIDEO,
    payload: data
});