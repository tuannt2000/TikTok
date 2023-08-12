import { api, apiWithoutHeader } from './api';

export const getAllUsers = async () => {
    const url = '/users';
    return apiWithoutHeader.get(url);
};

export const getListFollowing = async ( id ) => {
    const url = 'users/following';
    return apiWithoutHeader.post(url, { id });
};

export const getListAccountOffer = async () => {
    const url = 'users/account-offer';
    return api.post(url);
};

export const getInfoUser = async () => {
    const url = 'users/info';
    return api.get(url);
};

export const getProfileUser = async ( nickname ) => {
    const token = localStorage.getItem("token");
    const url = token ? '/users/profile/logined' : '/users/profile';

    if (token) {
        return api.get(url, {
            params: { nickname }
        });
    } else {
        return apiWithoutHeader.get(url, {
            params: { nickname }
        });
    }
};

export const follow = (data) => {
    const url ='/follow';
    return api.post(url, data);
};

export const getListFriend = () => {
    const url ='users/friend';
    return api.get(url);
};