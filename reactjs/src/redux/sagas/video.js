import { 
    getListVideo, 
    getMyVideo, 
    uploadVideo,
    likeVideo
} from "~/services/videoService";
import { call, put, takeLatest } from "redux-saga/effects";
import { 
    GET_LIST_VIDEO, 
    GET_MY_VIDEO,
    UPLOAD_VIDEO,
    LIKE_VIDEO
} from "../constants/video";
import {
    setListVideo,
    setMyVideo,
    setMessageVideo
} from "../actions/video";

function* sagaListVideo() {
    try {
        const res = yield call(getListVideo);
        const { data } = res;
        yield put(setListVideo(data.data));
    } catch (error) {
        console.log(error);
    }
}

function* sagaMyVideo() {
    try {
        const res = yield call(getMyVideo);
        const { data } = res;
        yield put(setMyVideo(data.data));
    } catch (error) {
        console.log(error);
    }
}

function* sagaUpload(action) {
    try {
        const res = yield call(uploadVideo, action.payload);
        const { data } = res;
        alert(data.message);
    } catch (error) {
        console.log(error);
    }
}

function* sagaLikeVideo(action) {
    try {
        const res = yield call(likeVideo, action.payload);
        const { data } = res;
        yield put(setMessageVideo(data.message));
    } catch (error) {
        console.log(error);
    }
}

function* followVideo() {
    yield takeLatest(GET_LIST_VIDEO, sagaListVideo);
    yield takeLatest(GET_MY_VIDEO, sagaMyVideo);
    yield takeLatest(UPLOAD_VIDEO, sagaUpload);
    yield takeLatest(LIKE_VIDEO, sagaLikeVideo);
}

export default followVideo;