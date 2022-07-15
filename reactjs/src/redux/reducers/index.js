import { combineReducers } from "redux";
import { loginReducer } from "./login";
import { languageReducer } from './language';
import { discoveReducer } from  './discove';
import { searchReducer } from "./search";

const rootReducer = combineReducers({
    login: loginReducer,
    language: languageReducer,
    discove: discoveReducer,
    search: searchReducer
});

export default rootReducer;