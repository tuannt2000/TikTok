import axios from 'axios';

const laravel = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_LARAVEL
});

export const searchUser = async (path, params = {}) => {
    const response = await laravel.get(path, params);

    return response.data;
}

export const getAllLanguages = async (path) => {
    const response = await laravel.get(path);
    
    return response.data;
}

export default laravel;