import * as types from '../constants/language';

export const getAllLanguages = ( data ) => ({
    type: types.GET_ALL_LANGUAGE,
    payload: data
});

export const setAllLanguages = ( data ) => ({
    type: types.SET_ALL_LANGUAGE,
    payload: data
});