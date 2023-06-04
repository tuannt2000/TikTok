import {
    getAllUsers,
    getListFollowing,
    getListAccountOffer,
    getInfoUser,
    getProfileUser,
    follow,
    getListFriend
} from "~/services/userService";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    GET_ALL_USER,
    GET_USER_FOLLOWING,
    GET_USER_OFFER,
    GET_INFO_USER,
    GET_PROFILE_USER,
    FOLLOW,
    GET_USER_FRIEND
} from "../constants/user";
import {
    setAllUser,
    setUserFollowing,
    setUserOffer,
    setInfoUser,
    setProfileUser,
    setUserFollow,
    setUserFriend
} from "../actions/user";
import { setMyVideoFollow, setVideoUserFollow } from "../actions/video";

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
        const res = yield call(getListFollowing, action.payload);
        const { data } = res;
        yield put(setUserFollowing(data.data));
    } catch (error) {
        console.log(error);
    }
}

function* sagaUserAccountOffer(action) {
    try {
        const res = yield call(getListAccountOffer, action.payload);
        const { data } = res;
        const new_data = data.data.map(obj => ({ ...obj, following: false }))
        yield put(setUserOffer(new_data));
    } catch (error) {
        console.log(error);
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

function* sagaProfileUser(action) {
    try {
        const res = yield call(getProfileUser, action.payload);
        const { data } = res;
        yield put(setProfileUser(data.data));
    } catch (error) {
        console.log(error);
    }
}

function* sagaFollow(action) {
    try {
        yield put(setUserFollow(action.payload.user_follower_id));
        yield put(setVideoUserFollow(action.payload.user_follower_id));
        yield put(setMyVideoFollow(action.payload.user_follower_id));
        yield call(follow, action.payload);
    } catch (error) {
        console.log(error);
    }
}

function* sagaUserFriend() {
    try {
        const res = yield call(getListFriend);
        const { data } = res;
        yield put(setUserFriend(data.data));
    } catch (error) {
        console.log(error);
    }
}

function* followUser() {
    yield takeLatest(GET_ALL_USER, sagaAllUser);
    yield takeLatest(GET_USER_FOLLOWING, sagaUserFollowing);
    yield takeLatest(GET_USER_OFFER, sagaUserAccountOffer);
    yield takeLatest(GET_INFO_USER, sagaUserInfo);
    yield takeLatest(GET_PROFILE_USER, sagaProfileUser);
    yield takeLatest(GET_PROFILE_USER, sagaProfileUser);
    yield takeLatest(FOLLOW, sagaFollow);
    yield takeLatest(GET_USER_FRIEND, sagaUserFriend);
}

export default followUser;