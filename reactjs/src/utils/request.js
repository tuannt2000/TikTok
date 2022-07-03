import axios from 'axios';

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

const laravel = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_LARAVEL
});

export const get = async (path, params = {}) => {
    const response = await request.get(path, params);

    return response.data;
}

export const getLanguages = async (path) => {
    const response = await laravel.get(path);
    
    return response.data;
}

export default request;