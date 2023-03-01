import * as types from '../constants/comment';

export const createComment = ( data = {} ) => ({
    type: types.CREATE_COMMENT,
    payload: data
});