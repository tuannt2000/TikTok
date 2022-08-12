import { uploadVideo } from "~/services/videoService";
import { call, put, takeLatest } from "redux-saga/effects";
import { UPLOAD_VIDEO } from "../constants/video";

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
    yield takeLatest(UPLOAD_VIDEO, sagaUpload);
}

export default followVideo;