import axios from "axios";

const token = localStorage.getItem("token");

export const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_LARAVEL,
    headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
    },
});

export const apiPostFile = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_LARAVEL,
    headers: {
        Authorization: "Bearer " + token,
        'Content-Type': 'multipart/form-data'
    },
});

export const apiWithoutHeader = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_LARAVEL
});