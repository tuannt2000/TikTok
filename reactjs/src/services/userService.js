import * as request from '~/utils/request';

export const getAllUsers = async () => {
    try {
        const res = await request.getAllUsers('users');

        if (res.code !== 200) {
            throw res.message
        }

        return res.data;
    } catch (error) {
        console.error(error)
    }
};

export const getListFollowing = async (id) => {
    try {
        const res = await request.getListFollowing(`users/${id}/following`);

        if (res.code !== 200) {
            throw res.message
        }

        return res.data;
    } catch (error) {
        console.error(error)
    }
};

export const getListAccountOffer = async (id) => {
    try {
        const res = await request.getListAccountOffer(`users/${id}/account-offer`);

        if (res.code !== 200) {
            throw res.message
        }

        return res.data;
    } catch (error) {
        console.error(error)
    }
};