import {ADD_EXAM} from "../../constants/exam";

const initialState = {

};

const library = (state = initialState, action) => {
	switch (action.type) {
		case ADD_EXAM:
			return {
				...state,
				[action.newExam.id]: action.newExam
			};

		default:
			return state;
	}
};

export default library;