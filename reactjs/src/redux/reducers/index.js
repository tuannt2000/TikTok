import { combineReducers } from "redux";
import { loginReducer } from "./login";
import { languageReducer } from './language';
import { discoveReducer } from  './discove';
import { searchReducer } from "./search";
import { userReducer } from "./user"
import { roomReducer } from "./room";

const rootReducer = combineReducers({
    login: loginReducer,
    language: languageReducer,
    discove: discoveReducer,
    search: searchReducer,
    user: userReducer,
    room: roomReducer
});

export default rootReducer;