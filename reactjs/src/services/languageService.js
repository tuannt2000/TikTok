import * as request from '~/utils/request';

export const getAllLanguages = async () => {
    try {
        const res = await request.getAllLanguages('languages');

        return res.data;
    } catch (error) {
        console.log(error)
    }
}