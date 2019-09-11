import {combineReducers} from "redux";
import * as Site from '../../../site/stores/reducers/index';
import header from './header';

export default combineReducers({
	header,
	...Site
})