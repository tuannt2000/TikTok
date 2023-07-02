import { loginGoogle, loginNormal, register } from "~/services/loginService";
import { call, put, takeLatest } from "redux-saga/effects";
import { LOGIN_NORMAL, POST_EMAIL_GOOGLE, REGISTER } from "../constants/login";
import { setAlertMessage } from "../actions/user";
import { setAccessToken, setLoading } from "../actions/login";

function* postEmailGoogle(action) {
    try {
        const response = yield call(loginGoogle, action.payload);
        const { data } = response;
        yield put(setLoading());
        if (data.data.code === 200) {
            localStorage.setItem("token", data.data.access_token);
            action.onSuccess(data.data.message);
            yield put(setAlertMessage("Đăng nhập thành công"));
        } else {
            action.onError(data.data.message);
            yield put(setAccessToken(""));
            yield put(setAlertMessage("Đăng nhập thất bại"));
        }
    } catch (e) {
        yield put(setLoading());
        action.onError(e.message);
        yield put(setAccessToken(""));
        yield put(setAlertMessage("Đăng nhập thất bại"));
    }
}

function* sagaLoginNormal(action) {
    try {
        const response = yield call(loginNormal, action.payload);
        const { data } = response;
        yield put(setLoading());
        localStorage.setItem("token", data.data.access_token);
        action.onSuccess(data.data.message);
        yield put(setAlertMessage("Đăng nhập thành công"));
    } catch (e) {
        yield put(setLoading());
        action.onError(e.message);
        yield put(setAccessToken(""));
        yield put(setAlertMessage("Đăng nhập thất bại"));
    }
}

function* sagaRegister(action) {
    try {
        const response = yield call(register, action.payload);
        const { data } = response;
        yield put(setLoading());
        localStorage.setItem("token", data.data.access_token);
        action.onSuccess(data.data.message);
        yield put(setAlertMessage("Đăng ký thành công"));
    } catch (e) {
        yield put(setLoading());
        action.onError(e.message);
        yield put(setAccessToken(""));
        yield put(setAlertMessage("Đăng ký thất bại"));
    }
}

function* followLogin() {
    yield takeLatest(POST_EMAIL_GOOGLE, postEmailGoogle);
    yield takeLatest(LOGIN_NORMAL, sagaLoginNormal);
    yield takeLatest(REGISTER, sagaRegister);
}

export default followLogin;