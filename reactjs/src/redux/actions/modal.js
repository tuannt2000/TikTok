import * as types from '../constants/modal';

export const setModalLogin = ( data = false ) => ({
    type: types.SET_MODAL_LOGIN,
    payload: data
});

export const setModalShare = ( data = false ) => ({
    type: types.SET_MODAL_SHARE,
    payload: data
});