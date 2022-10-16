import * as types from '../constants/video';

export const listVideo = () => ({
    type: types.GET_LIST_VIDEO
});

export const setListVideo = ( data ) => ({
    type: types.SET_LIST_VIDEO,
    payload: data
});

export const uploadVideo = ( data ) => ({
    type: types.UPLOAD_VIDEO,
    payload: data
});