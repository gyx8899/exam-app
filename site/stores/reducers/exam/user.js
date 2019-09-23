import {INIT_EXERCISE, DO_EXERCISE} from "../../constants/exam";

const initialState = {

};

const user = (state = initialState, action) => {
	switch (action.type) {
		case INIT_EXERCISE:
			return {
				...state,
				[action.examId]: action.exercise
			};
		case DO_EXERCISE:
			return {
				...state,
				[action.examId]: {
					...state[action.examId],
					[action.paperIndex]: {
						...state[action.examId][action.paperIndex],
						[action.qIndex]: {
							answer: action.qAnswer,
							isRight: action.isRight
						}
					}
				}
			};

		default:
			return state;
	}
};

export default user;