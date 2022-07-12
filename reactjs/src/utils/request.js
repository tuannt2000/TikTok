import axios from 'axios';

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_LARAVEL
});

export const getAllUsers = async (path) => {
    const response = await request.get(path);

    return response.data;
};

export const searchUser = async (path, params = {}) => {
    const response = await request.get(path, params);

    return response.data;
};

export const getListFollowing = async (path) => {
    const response = await request.get(path);

    return response.data;
};

export const getListAccountOffer = async (path) => {
    const response = await request.get(path);

    return response.data;
};

export const getAllLanguages = async (path) => {
    const response = await request.get(path);
    
    return response.data;
};

export const getAllDiscoves = async (path) => {
    const response = await request.get(path);

    return response.data;
};

export default request;