import { apiWithoutHeader } from './api';

export const getLanguages = () => {
    const url ='/languages';
    return apiWithoutHeader.get(url);
};