import { api } from './api';

export const createCommnet = (data) => {
    const url ='/comment/create';
    return api.post(url, data);
};