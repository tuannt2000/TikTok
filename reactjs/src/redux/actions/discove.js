import * as types from '../constants/discove';

export const getAllDiscoves = () => ({
    type: types.GET_ALL_DISCOVE
});

export const setAllDiscoves = ( data ) => ({
    type: types.SET_ALL_DISCOVE,
    payload: data
});