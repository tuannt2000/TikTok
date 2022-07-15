import { combineReducers } from "redux";
import loginReducer from "../reducers/login";
import modalReducer from "./modalSlice";

const rootReducer = combineReducers({
    login: loginReducer,
    modal: modalReducer,
});

export default rootReducer;