import { getLanguages } from "~/services/languageService";
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ALL_LANGUAGE } from "../constants/language";
import { setAllLanguages } from "../actions/language";

function* sagaAllLanguages(action) {
    try {
        const res = yield call(getLanguages);
        const { data } = res;
        yield put(setAllLanguages(data.data));
    } catch (error) {
        console.log(error);
        action.payload.navigate('/500');
    }
}

function* followLanguage() {
    yield takeLatest(GET_ALL_LANGUAGE, sagaAllLanguages);
}

export default followLanguage;