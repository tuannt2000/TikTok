import * as types from '../constants/user';

const initState = {
    user: [],
    userFollowing: [],
    setUserFollowing: false,
    userOffer: [],
    setUserOffer: false,
    currentUser: {},
    profile: {},
    alertMessage: ''
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
        default:
            return state;
    }
};