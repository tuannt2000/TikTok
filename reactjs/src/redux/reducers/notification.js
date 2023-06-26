import * as types from '../constants/notification';

const initState = {
    notifications: []
};

export const notificationReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_NOTIFICATION_COUNT:
            const new_notifications = state.notifications.filter(data => data.id !== action.payload.id);
            new_notifications.push(action.payload);

            return {
                ...state,
                notifications: new_notifications
            };
        case types.REMOVE_NOTIFICATIONS:
            const new_notifications_remove = state.notifications.filter(data => data.id !== action.payload.notification_id);

            return {
                ...state,
                notifications: new_notifications_remove
            };
        default:
            return state;
    }
};