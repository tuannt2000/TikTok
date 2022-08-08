import { getListRooms, getListMessages, sendMessage } from "~/services/roomService";
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ALL_ROOM, GET_ALL_MESSAGES, SEND_MESSAGE } from "../constants/room";
import { setAllRooms, setAllMessages } from "../actions/room";

function* getAllRooms(action) {
    try {
        const response = yield call(getListRooms, action.payload);
        const { data } = response;
        yield put(setAllRooms(data.data));
    } catch (e) {
        action.onError(e.message);
    }
}

function* getAllMessages(action) {
    try {
        const response = yield call(getListMessages, action.payload);
        const { data } = response;
        yield put(setAllMessages(data.data));
    } catch (e) {
        action.onError(e.message);
    }
}

function* postMessage(action) {
    try {
        yield call(sendMessage, action.payload);
    } catch (e) {
        action.onError(e.message);
    }
}

function* followRoom() {
    yield takeLatest(GET_ALL_ROOM, getAllRooms);
    yield takeLatest(GET_ALL_MESSAGES, getAllMessages);
    yield takeLatest(SEND_MESSAGE, postMessage);
}

export default followRoom;