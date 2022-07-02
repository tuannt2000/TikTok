import axios from 'axios';

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

export const get = async (path, params = {}) => {
    const response = await request.get(path, params);

    return response.data;
}

export default request;