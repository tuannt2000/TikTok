import * as types from '../constants/notification';

export const setCountNotification = (data = {}) => ({
    type: types.SET_NOTIFICATION_COUNT,
    payload: data
});

export const filterNotification = (data = {}) => ({
    type: types.REMOVE_NOTIFICATIONS,
    payload: data
});