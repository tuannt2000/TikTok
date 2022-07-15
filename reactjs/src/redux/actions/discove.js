import * as types from '../constants/discove';

export const getAllDiscoves = ( data ) => ({
    type: types.GET_ALL_DISCOVE,
    payload: data
});

export const setAllDiscoves = ( data ) => ({
    type: types.SET_ALL_DISCOVE,
    payload: data
});