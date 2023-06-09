import { api } from './api';

export const createComment = (data) => {
    const url ='/comment/create';
    return api.post(url, data);
};

export const deleteComment = (data) => {
    const url ='/comment/delete';
    return api.post(url, data);
};

export const getListComment = (video_id) => {
    const url = `/comment/${video_id}/list-comment`;
    return api.get(url);
};