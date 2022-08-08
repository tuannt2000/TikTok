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

export const sendMessage = async ({idRoom, user_id, message}) => {
    const url = 'message';
    return api.post(url, {
        room_id: idRoom,
        user_id,
        text: message
    });
};