import * as request from '~/utils/request';

export const languages = async () => {
    try {
        const res = await request.getLanguages('languages');

        return res.data;
    } catch (error) {
        console.log(error)
    }
}