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

export const searchTopVideo = (q) => {
    const url ='/search/top-video';
    return api.get(url, {
        params: {q}
    });
};

export const searchTopUser = (q) => {
    const url ='/search/top-user';
    return api.get(url, {
        params: {q}
    });
};