import {all} from 'redux-saga/effects';
import userSaga from './user/index';

export default function* rootSaga() {
	yield all([
			...userSaga
	])
}