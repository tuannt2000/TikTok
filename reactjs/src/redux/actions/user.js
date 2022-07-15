import * as types from '../constants/user';

export const getAllUser = ( data ) => ({
    type: types.GET_ALL_USER,
    payload: data
});

export const setAllUser = ( data ) => ({
    type: types.SET_ALL_USER,
    payload: data
});

export const getUserFollowing = ( data ) => ({
    type: types.GET_USER_FOLLOWING,
    payload: data
});

export const setUserFollowing = ( data ) => ({
    type: types.SET_USER_FOLLOWING,
    payload: data
});

export const getUserOffer = ( data ) => ({
    type: types.GET_USER_OFFER,
    payload: data
});

export const setUserOffer = ( data ) => ({
    type: types.SET_USER_OFFER,
    payload: data
});