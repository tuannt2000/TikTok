import * as request from '~/utils/request';

export const getAllLanguages = async () => {
    try {
        const res = await request.getAllLanguages('languages');

        if (res.code !== 200) {
            throw res.message
        }

        return res.data;
    } catch (error) {
        console.error(error)
    }
}