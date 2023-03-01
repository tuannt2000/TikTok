import { createCommnet } from "~/services/commentService";
import { call, put, takeLatest } from "redux-saga/effects";
import { CREATE_COMMENT } from "../constants/comment";
import {
    setAlertMessage
} from "../actions/user";

function* sagaCreateComment(action) {
    try {
        const res = yield call(createCommnet, action.payload);
        const { data } = res;
        yield put(setAlertMessage(data.message));
    } catch (error) {
        console.log(error);
        yield put(setAlertMessage("Đăng comment thất bại! Hãy thử lại sau"));
    }
}

function* commentDiscove() {
    yield takeLatest(CREATE_COMMENT, sagaCreateComment);
}

export default commentDiscove;