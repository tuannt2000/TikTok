import { api } from './api';

export const getListRooms = async (user_id) => {
    const url = 'rooms';
    return api.get(url, {
        params: {user_id}
    });
};