import { api, apiWithoutHeader } from './api';

export const getAllUsers = async () => {
    const url = '/users';
    return apiWithoutHeader.get(url);
};

export const getListFollowing = async ( id ) => {
    const url = 'users/following';
    return apiWithoutHeader.post(url, { id });
};

export const getListAccountOffer = async ( id ) => {
    const url = 'users/account-offer';
    return apiWithoutHeader.post(url, { id });
};

export const getInfoUser = async () => {
    const url = 'users/info';
    return api.get(url);
};

export const getProfileUser = async ( nickname ) => {
    const url ='/users/profile';
    return apiWithoutHeader.get(url, {
        params: { nickname }
    });
};