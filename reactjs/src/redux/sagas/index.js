import { all, call } from "redux-saga/effects";
import followLogin from "./login";
import followLanguage from "./language";
import followDiscove from './discove';
import followSearch from "./search";
import followUser from "./user"
import followRoom from "./room";
import followVideo from "./video";
import followComment from "./comment";

export default function* rootSaga() {
    yield all([
        call(followLogin),
        call(followLanguage),
        call(followDiscove),
        call(followSearch),
        call(followUser),
        call(followRoom),
        call(followVideo),
        call(followComment)
    ]);
}