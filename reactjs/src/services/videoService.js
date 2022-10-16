import { api } from './api';

export const getListVideo = async () => {
    const url ='/video';
    return api.get(url);
};

export const uploadVideo = async (data) => {
    const url ='/video/upload';
    return api.post(url, {
        url: data.url,
        name: data.name
    });
};