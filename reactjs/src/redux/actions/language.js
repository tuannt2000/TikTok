import * as types from '../constants/language';

export const getAllLanguages = ( ) => ({
    type: types.GET_ALL_LANGUAGE
});

export const setAllLanguages = ( data ) => ({
    type: types.SET_ALL_LANGUAGE,
    payload: data
});