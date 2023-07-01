import { api } from './api';

export const loginGoogle = (data) => {
    const url ='/redirectGoogle';
    return api.post(url, data);
};

export const loginNormal = (data) => {
    const url ='/login';
    return api.post(url, data);
};

export const register = (data) => {
    const url ='/register';
    return api.post(url, data);
};