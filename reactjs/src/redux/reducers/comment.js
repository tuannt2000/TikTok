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
        case types.SET_LIST_COMMENT_DELETED:
            const new_list_comment = state.listComment.filter(item => item.id !== action.payload.id);
            return {
                ...state,
                listComment: new_list_comment
            };
        default:
            return state;
    }
};