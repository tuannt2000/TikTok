import { loginGoogle } from "~/services/loginService";
import { call, takeLatest } from "redux-saga/effects";
import { POST_EMAIL_GOOGLE } from "../constants/login";

function* postEmailGoogle(action) {
    try {
        const response = yield call(loginGoogle, action.payload);
        const { data } = response;
        if (data.data.code === 200) {
            localStorage.setItem("token", data.data.access_token);
            action.onSuccess(data.data.message);
        } else {
            action.onError(data.data.message);
        }
    } catch (e) {
        action.onError(e.message);
    }
}

function* followLogin() {
    yield takeLatest(POST_EMAIL_GOOGLE, postEmailGoogle);
}

export default followLogin;