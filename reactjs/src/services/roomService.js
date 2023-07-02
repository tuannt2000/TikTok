import { api } from './api';

export const getListRooms = async (user_id) => {
    const url = 'rooms';
    return api.get(url, {
        params: {user_id}
    });
};

export const getListMessages = async (room_id) => {
    const url = 'messages';
    return api.get(url, {
        params: {room_id}
    });
};

export const sendMessage = async ({room_id, user_id, message}) => {
    const url = 'message';
    return api.post(url, {
        room_id,
        user_id,
        text: message
    });
};

export const removeNotification = async (data) => {
    const url = 'notification';
    return api.post(url, data);
};