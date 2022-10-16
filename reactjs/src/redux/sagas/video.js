import { getListVideo, uploadVideo } from "~/services/videoService";
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_LIST_VIDEO, UPLOAD_VIDEO } from "../constants/video";
import {
    setListVideo
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

function* sagaUpload(action) {
    try {
        const res = yield call(uploadVideo, action.payload);
        const { data } = res;
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}

function* followVideo() {
    yield takeLatest(GET_LIST_VIDEO, sagaListVideo);
    yield takeLatest(UPLOAD_VIDEO, sagaUpload);
}

export default followVideo;