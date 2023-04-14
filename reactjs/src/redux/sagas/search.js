import { searchUser, searchUserWithHeader, searchTopVideo } from "~/services/searchService";
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_RESULT_SEARCH, GET_TOP_VIDEO } from "../constants/search";
import { 
    setResultSearch, setTopVideo 
} from "../actions/search";
import {
    setAlertMessage
} from "../actions/user";

function* sagaSearch(action) {
    try {
        yield put(setResultSearch({data: [], isLoading: true}));
        let res;
        if (action.payload.logined) {
            res = yield call(searchUserWithHeader, action.payload.q);
        } else {
            res = yield call(searchUser, action.payload.q);
        }
        
        const { data } = res;
        yield put(setResultSearch({data: data.data, isLoading: false}));
    } catch (error) {
        console.log(error)
        action.payload.navigate('/500');
    }
}

function* sagaSearchTopVideo(action) {
    try {
        const response = yield call(searchTopVideo, action.payload.q);
        const { data } = response;
        yield put(setTopVideo(data.data));
    } catch (error) {
        console.log(error)
        yield put(setAlertMessage("Website đang xảy ra sự cố, hãy thử lại sau !"));
    }
}

function* followSearch() {
    yield takeLatest(GET_RESULT_SEARCH, sagaSearch);
    yield takeLatest(GET_TOP_VIDEO, sagaSearchTopVideo);
}

export default followSearch;