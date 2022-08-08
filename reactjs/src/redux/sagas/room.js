import { getListRooms } from "~/services/roomService";
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ALL_ROOM } from "../constants/room";
import { setAllRooms } from "../actions/room";

function* getAllRooms(action) {
    try {
        const response = yield call(getListRooms, action.payload);
        const { data } = response;
        yield put(setAllRooms(data.data));
    } catch (e) {
        action.onError(e.message);
    }
}

function* followRoom() {
    yield takeLatest(GET_ALL_ROOM, getAllRooms);
}

export default followRoom;