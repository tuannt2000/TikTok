import * as request from '~/utils/request';

export const getAllDiscoves = async () => {
    try {
        const res = await request.getAllDiscoves('discoves');

        if (res.code !== 200) {
            throw res.message
        }

        return res.data;
    } catch (error) {
        console.error(error)
    }
}