import {
    getAllUsers,
    getListFollowing,
    getListAccountOffer,
    getInfoUser,
    getProfileUser,
    follow,
    getListFriend,
    getNotifications,
    updateNotifications,
    getNotificationsMessages,
    updateNotificationsMessage
} from "~/services/userService";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    GET_ALL_USER,
    GET_USER_FOLLOWING,
    GET_USER_OFFER,
    GET_INFO_USER,
    GET_PROFILE_USER,
    FOLLOW,
    GET_USER_FRIEND,
    GET_NOTIFICATIONS,
    UPDATE_NOTIFICATIONS,
    GET_NOTIFICATIONS_MESSAGES,
    UPDATE_NOTIFICATIONS_MESSAGE
} from "../constants/user";
import {
    setAllUser,
    setUserFollowing,
    setUserOffer,
    setInfoUser,
    setProfileUser,
    setUserFollow,
    setUserFriend,
    setProFile,
    setNotifications,
    setNotificationsAfterUpdate,
    setNotificationFollow,
    setNotificationsMessages,
    setNotificationsMessageAfterUpdate
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

function* sagaUserAccountOffer() {
    try {
        const res = yield call(getListAccountOffer);
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
        yield put(setProFile(action.payload.user_follower_id));
        yield put(setNotificationFollow(action.payload.user_follower_id));
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

function* sagaNotifications() {
    try {
        const res = yield call(getNotifications);
        const { data } = res;
        yield put(setNotifications(data.data));
    } catch (error) {
        console.log(error);
    }
}

function* sagaUpdateNotifications() {
    try {
        const res = yield call(updateNotifications);
        const { data } = res;
        console.log(data.message);
        yield put(setNotificationsAfterUpdate());
    } catch (error) {
        console.log(error);
    }
}

function* sagaNotificationsMessages() {
    try {
        const res = yield call(getNotificationsMessages);
        const { data } = res;
        yield put(setNotificationsMessages(data.data));
    } catch (error) {
        console.log(error);
    }
}

function* sagaUpdateNotificationMessage(action) {
    try {
        yield call(updateNotificationsMessage, action.payload);
        yield put(setNotificationsMessageAfterUpdate(action.payload));
    } catch (e) {
        console.log(e);
    }
}

function* followUser() {
    yield takeLatest(GET_ALL_USER, sagaAllUser);
    yield takeLatest(GET_USER_FOLLOWING, sagaUserFollowing);
    yield takeLatest(GET_USER_OFFER, sagaUserAccountOffer);
    yield takeLatest(GET_INFO_USER, sagaUserInfo);
    yield takeLatest(GET_PROFILE_USER, sagaProfileUser);
    yield takeLatest(FOLLOW, sagaFollow);
    yield takeLatest(GET_USER_FRIEND, sagaUserFriend);
    yield takeLatest(GET_NOTIFICATIONS, sagaNotifications);
    yield takeLatest(UPDATE_NOTIFICATIONS, sagaUpdateNotifications);
    yield takeLatest(GET_NOTIFICATIONS_MESSAGES, sagaNotificationsMessages);
    yield takeLatest(UPDATE_NOTIFICATIONS_MESSAGE, sagaUpdateNotificationMessage);
}

export default followUser;