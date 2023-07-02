import { getListRooms, getListMessages, sendMessage, removeNotification } from "~/services/roomService";
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ALL_ROOM, GET_ALL_MESSAGES, SEND_MESSAGE, REMOVE_NOTIFICATION } from "../constants/room";
import { setAllRooms, setAllMessages } from "../actions/room";
import { filterNotification } from "../actions/notification";

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
        action.onError(e.message);
    }
}

function* sagaRemoveNotification(action) {
    try {
        yield call(removeNotification, action.payload);
        yield put(filterNotification(action.payload));
    } catch (e) {
        action.onError(e.message);
    }
}

function* followRoom() {
    yield takeLatest(GET_ALL_ROOM, getAllRooms);
    yield takeLatest(GET_ALL_MESSAGES, getAllMessages);
    yield takeLatest(SEND_MESSAGE, postMessage);
    yield takeLatest(REMOVE_NOTIFICATION, sagaRemoveNotification);
}

export default followRoom;