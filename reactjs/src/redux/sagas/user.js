import { getAllUsers, getListFollowing, getListAccountOffer, getInfoUser } from "~/services/userService";
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ALL_USER, GET_USER_FOLLOWING, GET_USER_OFFER, GET_INFO_USER } from "../constants/user";
import { setAllUser, setUserFollowing, setUserOffer, setInfoUser } from "../actions/user";

function* sagaAllUser(action) {
    try {
        const res = yield call(getAllUsers);
        const { data } = res;
        yield put(setAllUser(data.data));
    } catch (error) {
        console.log(error);
        action.payload.navigate('/500');
    }
}

function* sagaUserFollowing(action) {
    try {
        const res = yield call(getListFollowing, action.payload.id);
        const { data } = res;
        yield put(setUserFollowing(data.data));
    } catch (error) {
        console.log(error);
        action.payload.navigate('/500');
    }
}

function* sagaUserAccountOffer(action) {
    try {
        const res = yield call(getListAccountOffer, action.payload.id);
        const { data } = res;
        yield put(setUserOffer(data.data));
    } catch (error) {
        console.log(error);
        action.payload.navigate('/500');
    }
}

function* sagaUserInfo() {
    try {
        const res = yield call(getInfoUser);
        const { data } = res;
        localStorage.setItem("current", JSON.stringify(data.data));
        yield put(setInfoUser(data.data));
    } catch (error) {
        console.log(error);
    }
}

function* followUser() {
    yield takeLatest(GET_ALL_USER, sagaAllUser);
    yield takeLatest(GET_USER_FOLLOWING, sagaUserFollowing);
    yield takeLatest(GET_USER_OFFER, sagaUserAccountOffer);
    yield takeLatest(GET_INFO_USER, sagaUserInfo);
}

export default followUser;