import * as request from '~/utils/request';

export const searchUser = async (q, type = 'less') => {
    try {
        const res = await request.searchUser('users/search', {
            params: {q, type}
        });

        if (![200, 404].includes(res.code)) {
            throw res.message
        }

        return res.data;
    } catch (error) {
        console.error(error)
    }
};