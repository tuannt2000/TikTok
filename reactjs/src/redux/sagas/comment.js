import { createComment, deleteComment, getListComment } from "~/services/commentService";
import { call, put, takeLatest } from "redux-saga/effects";
import { 
    CREATE_COMMENT,
    DELETE_COMMENT,
    GET_LIST_COMMENT
} from "../constants/comment";
import {
    setAlertMessage
} from "../actions/user";

import {
    setListComment, setListCommentAfterDelete
} from "../actions/comment";

function* sagaCreateComment(action) {
    try {
        const res = yield call(createComment, action.payload);
        const { data } = res;
        yield put(setAlertMessage(data.message));
    } catch (error) {
        console.log(error);
        yield put(setAlertMessage("Người sở hữu video đã đóng tính năng comment"));
    }
}

function* sagaDeleteComment(action) {
    try {
        const res = yield call(deleteComment, action.payload);
        const { data } = res;
        // yield put(setListCommentAfterDelete(action.payload));
        yield put(setAlertMessage(data.message));
    } catch (error) {
        console.log(error);
        yield put(setAlertMessage("Đã có lỗi xảy ra, hãy thử lại!"));
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

function* followComment() {
    yield takeLatest(CREATE_COMMENT, sagaCreateComment);
    yield takeLatest(GET_LIST_COMMENT, sagaGetListComment);
    yield takeLatest(DELETE_COMMENT, sagaDeleteComment);
}

export default followComment;