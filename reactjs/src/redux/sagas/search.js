import { searchUser, searchUserWithHeader } from "~/services/searchService";
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_RESULT_SEARCH } from "../constants/search";
import { setResultSearch } from "../actions/search";

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

function* followSearch() {
    yield takeLatest(GET_RESULT_SEARCH, sagaSearch);
}

export default followSearch;