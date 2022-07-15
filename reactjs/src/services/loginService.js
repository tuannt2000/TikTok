import { api } from './api';

export const loginGoogle = (data) => {
    const url ='/redirectGoogleOAuth2';
    return api.post(url, data);
};