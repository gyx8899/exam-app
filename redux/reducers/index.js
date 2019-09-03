import {combineReducers} from "redux";
import home from './home';
import user from './user';
import exam from './exam';
import header from './header';

export default combineReducers({
	home,
	user,
	exam,
	header
})