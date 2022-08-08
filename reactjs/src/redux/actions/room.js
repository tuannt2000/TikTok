import * as types from '../constants/room';

export const getAllRooms = ( data ) => ({
    type: types.GET_ALL_ROOM,
    payload: data
});

export const setAllRooms = ( data ) => ({
    type: types.SET_ALL_ROOM,
    payload: data
});