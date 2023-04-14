import { api, apiPostFile } from './api';

export const getListVideo = async () => {
    const url ='/video';
    return api.get(url);
};

export const getListVideoFollowing = async () => {
    const url ='/video/following';
    return api.get(url);
};

export const getMyVideo = async () => {
    const url ='/video/my-video';
    return api.get(url);
};

export const uploadVideo = async (data) => {
    const url ='/video/upload';
    return apiPostFile.post(url, data);
};

export const likeVideo = async (data) => {
    const url ='/video/like';
    return api.post(url, data);
};