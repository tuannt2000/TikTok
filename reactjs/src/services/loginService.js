import { apiWithoutHeader } from './api';

export const loginGoogle = (data) => {
    const url ='/redirectGoogle';
    return apiWithoutHeader.post(url, data);
};

export const loginNormal = (data) => {
    const url ='/login';
    return apiWithoutHeader.post(url, data);
};

export const register = (data) => {
    const url ='/register';
    return apiWithoutHeader.post(url, data);
};

export const forgetPassword = (data) => {
    const url ='/forget-password';
    return apiWithoutHeader.post(url, data);
};