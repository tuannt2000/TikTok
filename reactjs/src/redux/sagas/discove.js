import { getAllDiscoves } from "~/services/discoveService";
import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ALL_DISCOVE } from "../constants/discove";
import { setAllDiscoves } from "../actions/discove";

function* sagaAllDiscoves(action) {
    try {
        const res = yield call(getAllDiscoves);
        const { data } = res;
        yield put(setAllDiscoves(data.data));
    } catch (error) {
        console.log(error);
        action.payload.navigate('/500')
    }
}

function* followDiscove() {
    yield takeLatest(GET_ALL_DISCOVE, sagaAllDiscoves);
}

export default followDiscove;