import { all, call } from "redux-saga/effects";
import followLogin from "./login";
import followLanguage from "./language";
import followDiscove from './discove';
import followSearch from "./search";

export default function* rootSaga() {
    yield all([
        call(followLogin),
        call(followLanguage),
        call(followDiscove),
        call(followSearch)
    ]);
}