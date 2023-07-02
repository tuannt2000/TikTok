import { 
    getListVideo,
    getListVideoFollowing,
    getMyVideo, 
    uploadVideo,
    likeVideo,
    getMyVideoLike,
    report,
    deleteVideo,
    editVideo,
    shareVideo,
    getVideoById
} from "~/services/videoService";
import { call, put, takeLatest } from "redux-saga/effects";
import { 
    GET_LIST_VIDEO,
    GET_LIST_VIDEO_FOLLOWING,
    GET_MY_VIDEO,
    GET_MY_VIDEO_LIKE,
    UPLOAD_VIDEO,
    LIKE_VIDEO,
    POST_REPORT_VIDEO,
    DELETE_MY_VIDEO,
    SET_VIDEO_DETAIL_WHEN_EDIT,
    SHARE_VIDEO,
    GET_VIDEO_BY_ID
} from "../constants/video";
import {
    setExistDataListVideo,
    setListVideo,
    setListVideoDetail,
    setListVideoFollowing,
    setLoadMore,
    setMyVideo,
    setMyVideoLike,
    setVideoDetailWhenDelete,
    setVideoDetailWhenEditSuccess
} from "../actions/video";
import {
    setAlertMessage
} from "../actions/user";

function* sagaListVideo(action) {
    try {
        const res = yield call(getListVideo, action.payload);
        const { data } = res;
        yield put(setListVideo(data.data));
        if (data.data.length === 0) {
            yield put(setExistDataListVideo(false));
        }
    } catch (error) {
        console.log(error);
    }

    yield put(setLoadMore(false));
}

function* sagaGetVideoById(action) {
    try {
        const res = yield call(getVideoById, action.payload);
        const { data } = res;
        yield put(setListVideoDetail({
            list_video_detail: [data.data], 
            data: data.data
        }));
    } catch (error) {
        console.log(error);
    }
}

function* sagaListVideoFollowing(action) {
    try {
        const res = yield call(getListVideoFollowing, action.payload);
        const { data } = res;
        yield put(setListVideoFollowing(data.data));
        if (data.data.length === 0) {
            yield put(setExistDataListVideo(false));
        }
    } catch (error) {
        console.log(error);
    }

    yield put(setLoadMore(false));
}

function* sagaMyVideo(action) {
    try {
        const res = yield call(getMyVideo, action.payload);
        const { data } = res;
        const new_data = data.data.map(obj => ({ ...obj, user: {...obj.user, following: obj.following.length ? true : false} }))
        yield put(setMyVideo(new_data));
    } catch (error) {
        console.log(error);
    }
}

function* sagaMyVideoLike() {
    try {
        const res = yield call(getMyVideoLike);
        const { data } = res;
        yield put(setMyVideoLike(data.data));
    } catch (error) {
        console.log(error);
    }
}

function* sagaUpload(action) {
    try {
        const res = yield call(uploadVideo, action.payload);
        const { data } = res;
        yield put(setAlertMessage(data.message));
    } catch (error) {
        console.log(error);
        yield put(setAlertMessage("Upload thất bại"));
    }
}

function* sagaDelete(action) {
    try {
        yield call(deleteVideo, action.payload);
        yield put(setVideoDetailWhenDelete(action.payload));
        yield put(setAlertMessage('Đã xóa'));
    } catch (error) {
        console.log(error);
        yield put(setAlertMessage("Có lỗi xảy ra, hãy thử lại sau"));
    }
}

function* sagaEdit(action) {
    try {
        yield call(editVideo, action.payload);
        yield put(setVideoDetailWhenEditSuccess(action.payload));
    } catch (error) {
        console.log(error);
        yield put(setAlertMessage("Có lỗi xảy ra, hãy thử lại sau"));
    }
}

function* sagaLikeVideo(action) {
    try {
        yield call(likeVideo, action.payload);
    } catch (error) {
        console.log(error);
    }
}

function* sagaReportVideo(action) {
    try {
        yield call(report, action.payload);
        yield put(setAlertMessage("Đã gửi báo cáo, cảm ơn bạn đã đóng góp ý kiến."));
    } catch (error) {
        console.log(error);
        yield put(setAlertMessage("Đã xảy ra lỗi, hãy thử lại."));
    }
}

function* sagaShareVideo(action) {
    try {
        yield call(shareVideo, action.payload);
        yield put(setAlertMessage("Đã share video"));
    } catch (error) {
        console.log(error);
        yield put(setAlertMessage("Đã xảy ra lỗi, hãy thử lại."));
    }
}

function* followVideo() {
    yield takeLatest(GET_LIST_VIDEO, sagaListVideo);
    yield takeLatest(GET_LIST_VIDEO_FOLLOWING, sagaListVideoFollowing);
    yield takeLatest(GET_MY_VIDEO, sagaMyVideo);
    yield takeLatest(GET_MY_VIDEO_LIKE, sagaMyVideoLike);
    yield takeLatest(UPLOAD_VIDEO, sagaUpload);
    yield takeLatest(LIKE_VIDEO, sagaLikeVideo);
    yield takeLatest(POST_REPORT_VIDEO, sagaReportVideo);
    yield takeLatest(DELETE_MY_VIDEO, sagaDelete);
    yield takeLatest(SET_VIDEO_DETAIL_WHEN_EDIT, sagaEdit);
    yield takeLatest(SHARE_VIDEO, sagaShareVideo);
    yield takeLatest(GET_VIDEO_BY_ID, sagaGetVideoById);
}

export default followVideo;