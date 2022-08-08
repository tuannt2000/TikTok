import * as types from '../constants/room';

const initState = {
    data: [],
    listMessages: []
};

export const roomReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_ALL_ROOM:
            return {
                ...state,
                data: action.payload
            };
        case types.SET_ALL_MESSAGES:
            return {
                ...state,
                listMessages: action.payload
            };
        case types.SET_ALL_MESSAGES_AFTER_SEND:
            return {
                ...state,
                listMessages: [...state.listMessages, action.payload]
            };
        default:
            return state;
    }
};