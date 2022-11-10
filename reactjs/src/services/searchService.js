import { apiWithoutHeader, api } from './api';

export const searchUser = (q, type = 'less') => {
    const url ='/users/search';
    return apiWithoutHeader.get(url, {
        params: {q, type}
    });
};

export const searchUserWithHeader = (q, type = 'less') => {
    const url ='/users/search/logined';
    return api.get(url, {
        params: {q, type}
    });
};