import * as HOME_ACTIONS from './home.js';
import * as USER_ACTIONS from './user.js';
import * as EXAM_ACTIONS from './exam.js';

export default {
	...HOME_ACTIONS,
	...USER_ACTIONS,
	...EXAM_ACTIONS
}