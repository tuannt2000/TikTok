import { getListRooms, getListMessages, sendMessage, deleteMessage } from "~/services/roomService";
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ALL_ROOM, GET_ALL_MESSAGES, SEND_MESSAGE, DELETE_MESSAGE } from "../constants/room";
import { setAllRooms, setAllMessages, setMessagesAfterDelete } from "../actions/room";

function* getAllRooms(action) {
    try {
        const response = yield call(getListRooms, action.payload);
        const { data } = response;
        yield put(setAllRooms(data.data));
    } catch (e) {
        console.log(e);
    }
}

function* getAllMessages(action) {
    try {
        const response = yield call(getListMessages, action.payload);
        const { data } = response;
        yield put(setAllMessages(data.data));
    } catch (e) {
        console.log(e);
    }
}

function* postMessage(action) {
    try {
        yield call(sendMessage, action.payload);
    } catch (e) {
        console.log(e)
    }
}

function* sagaDeleteMessage(action) {
    try {
        yield call(deleteMessage, action.payload);
        yield put(setMessagesAfterDelete(action.payload));
    } catch (e) {
        console.log(e);
    }
}

function* followRoom() {
    yield takeLatest(GET_ALL_ROOM, getAllRooms);
    yield takeLatest(GET_ALL_MESSAGES, getAllMessages);
    yield takeLatest(SEND_MESSAGE, postMessage);
    yield takeLatest(DELETE_MESSAGE, sagaDeleteMessage);
}

export default followRoom;