import { apiWithoutHeader } from './api';

export const getAllDiscoves = async () => {
    const url ='/discoves';
    return apiWithoutHeader.get(url);
};