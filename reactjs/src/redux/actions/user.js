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

export const getInfoUser = () => ({
    type: types.GET_INFO_USER,
});

export const setInfoUser = ( data ) => ({
    type: types.SET_INFO_USER,
    payload: data
});

export const getProfileUser = ( nickname ) => ({
    type: types.GET_PROFILE_USER,
    payload: nickname
});

export const setProfileUser = ( data ) => ({
    type: types.SET_PROFILE_USER,
    payload: data
});