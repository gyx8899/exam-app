import {combineReducers} from "redux";
import library from './library';
import user from './user';
import config from './config';

export default combineReducers({
	library,
	user,
	config
})