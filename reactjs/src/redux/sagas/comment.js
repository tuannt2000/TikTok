import { createComment, getListComment } from "~/services/commentService";
import { call, put, takeLatest } from "redux-saga/effects";
import { 
    CREATE_COMMENT,
    GET_LIST_COMMENT
} from "../constants/comment";
import {
    setAlertMessage
} from "../actions/user";

import {
    setListComment
} from "../actions/comment";

function* sagaCreateComment(action) {
    try {
        const res = yield call(createComment, action.payload);
        const { data } = res;
        yield put(setAlertMessage(data.message));
    } catch (error) {
        console.log(error);
        yield put(setAlertMessage("Đăng comment thất bại! Hãy thử lại sau"));
    }
}

function* sagaGetListComment(action) {
    try {
        const res = yield call(getListComment, action.payload);
        const { data } = res;
        yield put(setListComment(data.data));
    } catch (error) {
        console.log(error);
    }
}

function* commentDiscove() {
    yield takeLatest(CREATE_COMMENT, sagaCreateComment);
    yield takeLatest(GET_LIST_COMMENT, sagaGetListComment);
}

export default commentDiscove;