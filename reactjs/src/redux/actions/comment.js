import * as types from '../constants/comment';

export const createComment = ( data = {} ) => ({
    type: types.CREATE_COMMENT,
    payload: data
});

export const getListComment = ( video_id = null ) => ({
    type: types.GET_LIST_COMMENT,
    payload: video_id
});

export const setListComment = ( data = [] ) => ({
    type: types.SET_LIST_COMMENT,
    payload: data
});