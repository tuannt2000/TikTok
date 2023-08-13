import * as types from '../constants/user';

const initState = {
    user: [],
    userFollowing: [],
    setUserFollowing: false,
    userOffer: [],
    setUserOffer: false,
    currentUser: {},
    profile: {},
    alertMessage: '',
    userFriend: [],
    notifications: []
};

export const userReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_ALL_USER:
            return {
                ...state,
                user: [...action.payload]
            };
        case types.SET_USER_FOLLOWING:
            return {
                ...state,
                userFollowing: [...action.payload],
                setUserFollowing: true
            };
        case types.SET_USER_OFFER:
            return {
                ...state,
                userOffer: [...action.payload],
                setUserOffer: true
            };
        case types.SET_INFO_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        case types.SET_USER_FRIEND:
            return {
                ...state,
                userFriend: action.payload
            };
        case types.SET_PROFILE_USER:
            return {
                ...state,
                profile: action.payload
            };
        case types.SET_ALERT_MESSAGE:
            return {
                ...state,
                alertMessage: action.payload
            };
        case types.SET_USER_FOLLOW:
            const new_list_user_offer = state.userOffer.map(result => {
                if (result.id === action.payload) {
                    result.following = !result.following;
                }

                return result;
            })

            return {
                ...state,
                userOffer: new_list_user_offer
            };
        case types.SET_PROFILE:
            return {
                ...state,
                profile: {...state.profile, is_user_following: state.profile.is_user_following ? 0 : 1}
            };
        case types.SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload
            };
        case types.SET_NOTIFICATIONS_AFTER_UPDATE:
            const new_notifications = state.notifications.map(notification => {
                notification.checked = 1;
                return notification;
            })
            return {
                ...state,
                notifications: new_notifications
            };
        case types.SET_NOTIFICATION:
            const notification_filter = state.notifications.filter(notification => {
                return notification.user_id !== action.payload.user_id || notification.recipient_id !== action.payload.recipient_id
                    || notification.table_name !== action.payload.table_name;
            })

            return {
                ...state,
                notifications: [action.payload, ...notification_filter]
            };
        case types.SET_NOTIFICATIONS_FOLLOW:
            const new_notifications_follow = state.notifications.map(notification => {
                if (notification.user.id === action.payload) {
                    notification.user.is_user_following = !notification.user.is_user_following;
                }
                return notification;
            })

            return {
                ...state,
                notifications: new_notifications_follow
            };
        default:
            return state;
    }
};