import * as request from '~/utils/request';

export const getAllDiscoves = async () => {
    try {
        const res = await request.getAllDiscoves('discoves');

        if (res.code !== 200) {
            throw res.message;
        }

        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const postDiscove = async (id) => {
    try {
        const res = await request.postDiscove('discove', {id});

        if (res.code !== 200) {
            throw res.message;
        }

        console.log(res.message);
    } catch (error) {
        console.error(error)
    }
}