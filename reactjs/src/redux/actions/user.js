import * as types from '../constants/user';

export const getAllUser = ( data ) => ({
    type: types.GET_ALL_USER,
    payload: data
});

export const setAllUser = ( data ) => ({
    type: types.SET_ALL_USER,
    payload: data
});

export const getUserFollowing = ( data ) => ({
    type: types.GET_USER_FOLLOWING,
    payload: data
});

export const setUserFollowing = ( data ) => ({
    type: types.SET_USER_FOLLOWING,
    payload: data
});

export const getUserOffer = () => ({
    type: types.GET_USER_OFFER
});

export const setUserOffer = ( data ) => ({
    type: types.SET_USER_OFFER,
    payload: data
});

export const getInfoUser = () => ({
    type: types.GET_INFO_USER,
});

export const setInfoUser = ( data ) => ({
    type: types.SET_INFO_USER,
    payload: data
});

export const getProfileUser = ( nickname ) => ({
    type: types.GET_PROFILE_USER,
    payload: nickname
});

export const setProfileUser = ( data ) => ({
    type: types.SET_PROFILE_USER,
    payload: data
});

export const postFollow = ( data ) => ({
    type: types.FOLLOW,
    payload: data
});

export const setAlertMessage = ( data = '' ) => ({
    type: types.SET_ALERT_MESSAGE,
    payload: data
});

export const setUserFollow = ( data ) => ({
    type: types.SET_USER_FOLLOW,
    payload: data
});

export const setProFile = ( data ) => ({
    type: types.SET_PROFILE,
    payload: data
});

export const getUserFriend = () => ({
    type: types.GET_USER_FRIEND
});

export const setUserFriend = ( data ) => ({
    type: types.SET_USER_FRIEND,
    payload: data
});

export const getNotifications = () => ({
    type: types.GET_NOTIFICATIONS
});

export const setNotifications = ( data ) => ({
    type: types.SET_NOTIFICATIONS,
    payload: data
});

export const updateNotifications = ( ) => ({
    type: types.UPDATE_NOTIFICATIONS,
});

export const setNotificationsAfterUpdate = () => ({
    type: types.SET_NOTIFICATIONS_AFTER_UPDATE,
});

export const setNotification = ( data ) => ({
    type: types.SET_NOTIFICATION,
    payload: data
});

export const setNotificationFollow = (data) => ({
    type: types.SET_NOTIFICATIONS_FOLLOW,
    payload: data
});

export const getNotificationsMessages = () => ({
    type: types.GET_NOTIFICATIONS_MESSAGES
});

export const setNotificationsMessages = ( data ) => ({
    type: types.SET_NOTIFICATIONS_MESSAGES,
    payload: data
});

export const updateNotificationsMessage = ( data ) => ({
    type: types.UPDATE_NOTIFICATIONS_MESSAGE,
    payload: data
});

export const setNotificationsMessageAfterUpdate = ( data ) => ({
    type: types.SET_NOTIFICATIONS_MESSAGE_AFTER_UPDATE,
    payload: data
});

export const setNotificationMessage = ( data ) => ({
    type: types.SET_NOTIFICATION_MESSAGE,
    payload: data
});