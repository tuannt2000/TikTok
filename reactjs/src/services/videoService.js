import { api, apiPostFile, apiWithoutHeader } from './api';

export const getListVideo = async (data) => {
    const url = localStorage.getItem("token") ? '/video' : '/video/not-login';
    return localStorage.getItem("token") ? api.get(url, {
        params: data
    }) : apiWithoutHeader.get(url);
};

export const getVideoById = async ($id) => {
    const url = '/video/' + $id;
    return api.get(url);
};

export const getListVideoFollowing = async (data) => {
    const url ='/video/following';
    return api.get(url, {
        params: data
    });
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

export const shareVideo = async (data) => {
    const url ='/video/share';
    return api.post(url, data);
};