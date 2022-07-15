import { searchUser } from "~/services/searchService";
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_RESULT_SEARCH } from "../constants/search";
import { setResultSearch } from "../actions/search";

function* sagaSearch(action) {
    try {
        const res = yield call(searchUser, action.payload);
        const { data } = res;
        yield put(setResultSearch(data.data));
    } catch (error) {
        console.log(error)
    }
}

function* followSearch() {
    yield takeLatest(GET_RESULT_SEARCH, sagaSearch);
}

export default followSearch;