import { apiWithoutHeader } from './api';

export const searchUser = (q, type = 'less') => {
    const url ='/users/search';
    return apiWithoutHeader.get(url, {
        params: {q, type}
    });
};