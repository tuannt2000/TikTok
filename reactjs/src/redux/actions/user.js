import * as types from '../constants/user';

export const getAllUser = () => ({
    type: types.GET_ALL_USER
});

export const setAllUser = ( data ) => ({
    type: types.SET_ALL_USER,
    payload: data
});

export const getUserFollowing = ( id ) => ({
    type: types.GET_USER_FOLLOWING,
    payload: id
});

export const setUserFollowing = ( data ) => ({
    type: types.SET_USER_FOLLOWING,
    payload: data
});

export const getUserOffer = ( id ) => ({
    type: types.GET_USER_OFFER,
    payload: id
});

export const setUserOffer = ( data ) => ({
    type: types.SET_USER_OFFER,
    payload: data
});