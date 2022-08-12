import { api } from './api';

export const uploadVideo = async (urlVideo) => {
    const url ='/video/upload';
    return api.post(url, {
        url: urlVideo
    });
};