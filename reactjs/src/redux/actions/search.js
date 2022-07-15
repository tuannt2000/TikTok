import * as types from '../constants/search';

export const getResultSearch = ( data ) => ({
    type: types.GET_RESULT_SEARCH,
    payload: data
});

export const setResultSearch = ( data = {data: [], isLoading: false} ) => ({
    type: types.SET_RESULT_SEARCH,
    payload: data
});