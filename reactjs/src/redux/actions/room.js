import * as types from '../constants/room';

export const getAllRooms = ( user_id ) => ({
    type: types.GET_ALL_ROOM,
    payload: user_id
});

export const setAllRooms = ( data ) => ({
    type: types.SET_ALL_ROOM,
    payload: data
});

export const getAllMessages = ( room_id ) => ({
    type: types.GET_ALL_MESSAGES,
    payload: room_id
});

export const setAllMessages = ( data ) => ({
    type: types.SET_ALL_MESSAGES,
    payload: data
});

export const sendMessage = ( data ) => ({
    type: types.SEND_MESSAGE,
    payload: data
});

export const setAllMessagesAfterSend = ( data ) => ({
    type: types.SET_ALL_MESSAGES_AFTER_SEND,
    payload: data
});

export const deleteMessage = ( data ) => ({
    type: types.DELETE_MESSAGE,
    payload: data
});

export const setMessagesAfterDelete = ( data ) => ({
    type: types.SET_MESSAGES_AFTER_DELETE,
    payload: data
});