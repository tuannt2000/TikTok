import * as types from '../constants/login';

export const loginSuccess = ( data = false ) => ({
    type: types.LOGIN_SUCCESS,
    payload: data
});

export const postEmailGoogle = (data, onSuccess, onError) => ({
    type: types.POST_EMAIL_GOOGLE,
    payload: data,
    onSuccess,
    onError
});