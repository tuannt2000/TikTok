import axios from "axios";

const token = localStorage.getItem("token");

export const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_LARAVEL,
    headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
});

export const apiPostFile = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_LARAVEL,
    headers: {
        Authorization: "Bearer " + token,
        'Content-Type': 'multipart/form-data',
        "Access-Control-Allow-Origin": "*"
    },
});

export const apiWithoutHeader = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_LARAVEL
});