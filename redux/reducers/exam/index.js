import {combineReducers} from "redux";
import library from './library';
import config from './config';

export default combineReducers({
	library,
	config
})