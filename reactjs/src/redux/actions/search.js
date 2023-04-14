import * as types from '../constants/search';

export const getResultSearch = ( data ) => ({
    type: types.GET_RESULT_SEARCH,
    payload: data
});

export const setResultSearch = ( data = {data: [], isLoading: false} ) => ({
    type: types.SET_RESULT_SEARCH,
    payload: data
});

export const getTopVideo = ( data ) => ({
    type: types.GET_TOP_VIDEO,
    payload: data
});

export const setTopVideo = ( data ) => ({
    type: types.SET_TOP_VIDEO,
    payload: data
});

export const getSearchVideo = ( data ) => ({
    type: types.GET_SEARCH_VIDEO,
    payload: data
});

export const setSearchVideo = ( data ) => ({
    type: types.SET_SEARCH_VIDEO,
    payload: data
});