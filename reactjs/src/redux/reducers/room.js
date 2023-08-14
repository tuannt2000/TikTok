import moment from 'moment/moment';
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
                listMessages: [action.payload, ...state.listMessages]
            };
        case types.SET_MESSAGES_AFTER_DELETE:
            const index_message = state.listMessages.findIndex(message => message.id === action.payload.id);
            if (index_message !== -1) {
                state.listMessages[index_message].deleted_at = moment().format('YYYY-MM-DD HH:mm:ss')
            }
            return state;
        case types.UPDATE_ROOM:
            const new_room = state.data.map(room => {
                if (room.room_id ===  action.payload.id) {
                    room.readed = 1;
                }
                return room;
            });

            return {
                ...state,
                data: new_room
            };
        default:
            return state;
    }
};