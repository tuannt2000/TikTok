import * as types from '../constants/video';

export const uploadVideo = ( data ) => ({
    type: types.UPLOAD_VIDEO,
    payload: data
});