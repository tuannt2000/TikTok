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