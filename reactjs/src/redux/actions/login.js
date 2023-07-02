import * as types from '../constants/login';

export const postEmailGoogle = (data, onSuccess, onError) => ({
    type: types.POST_EMAIL_GOOGLE,
    payload: data,
    onSuccess,
    onError
});

export const setAccessToken = ( data ) => ({
    type: types.SET_ACCESS_TOKEN,
    payload: data
})

export const setLoading = ( data = false ) => ({
    type: types.SET_LOADING,
    payload: data
})

export const loginNormal = (data, onSuccess, onError) => ({
    type: types.LOGIN_NORMAL,
    payload: data,
    onSuccess,
    onError
});

export const register = (data, onSuccess, onError) => ({
    type: types.REGISTER,
    payload: data,
    onSuccess,
    onError
});