import * as types from '../constants/room';

const initState = {
    data: []
};

export const roomReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_ALL_ROOM:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
};