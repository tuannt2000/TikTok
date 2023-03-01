import * as types from '../constants/comment';

const initState = {
    listComment: [],
};

export const commentReducer = (state = initState, action) => {
    switch (action.type) {
        case types.SET_LIST_COMMENT:
            return {
                ...state,
                listComment: action.payload
            };
        default:
            return state;
    }
};