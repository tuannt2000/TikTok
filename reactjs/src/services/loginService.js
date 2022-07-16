import { api } from './api';

export const loginGoogle = (data) => {
    const url ='/redirectGoogle';
    return api.post(url, data);
};