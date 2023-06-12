import { combineReducers } from "redux";
import { loginReducer } from "./login";
import { languageReducer } from './language';
import { discoveReducer } from  './discove';
import { searchReducer } from "./search";
import { userReducer } from "./user"
import { roomReducer } from "./room";
import { videoReducer } from "./video";
import { commentReducer } from "./comment";
import { modalReducer } from "./modal";
import { notificationReducer } from "./notification";

const rootReducer = combineReducers({
    login: loginReducer,
    language: languageReducer,
    discove: discoveReducer,
    search: searchReducer,
    user: userReducer,
    room: roomReducer,
    video: videoReducer,
    comment: commentReducer,
    modal: modalReducer,
    notification: notificationReducer
});

export default rootReducer;