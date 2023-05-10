import { api, apiPostFile, apiWithoutHeader } from './api';

export const getListVideo = async () => {
    const url = localStorage.getItem("token") ? '/video' : '/video/not-login';
    return localStorage.getItem("token") ? api.get(url) : apiWithoutHeader.get(url);
};

export const getListVideoFollowing = async () => {
    const url ='/video/following';
    return api.get(url);
};

export const getMyVideo = async (id) => {
    const url ='/video/my-video';
    return api.get(url, {
        params: {id}
    });
};

export const getMyVideoLike = async () => {
    const url ='/video/my-video/like';
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

export const report = async (data) => {
    const url ='/video/report';
    return api.post(url, data);
};

export const deleteVideo = async (data) => {
    const url ='/video/delete';
    return api.post(url, data);
};

export const editVideo = async (data) => {
    const url ='/video/edit';
    return api.post(url, data);
};