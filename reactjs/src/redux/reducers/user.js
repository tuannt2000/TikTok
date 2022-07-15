import * as types from '../constants/user';

const initState = {
    user: [],
    userFollowing: [],
    userOffer: [],
    auth: {}
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
                userFollowing: [...action.payload]
            };
        case types.SET_USER_OFFER:
            return {
                ...state,
                userOffer: [...action.payload]
            };
        default:
            return state;
    }
};