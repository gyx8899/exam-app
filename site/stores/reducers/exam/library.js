import {ADD_EXAM, DO_EXERCISE} from "../../constants/exam";
import {isRightAnswer} from "../../../util/exam";

const initialState = {

};

const library = (state = initialState, action) => {
	switch (action.type) {
		case ADD_EXAM:
			return {
				...state,
				[action.newExam.id]: action.newExam
			};
		case DO_EXERCISE:
			return {
				...state,
				[action.examId]: {
					...state[action.examId],
					papers: state[action.examId].papers.map((paper, paperIndex) => {
						if (paperIndex === action.paperIndex) {
							return {
								...paper,
								data: paper.data.map((q, qIndex) => {
									if (qIndex === action.qIndex) {
										return {
											...q,
											answer: action.qAnswer,
											isRight: isRightAnswer(action.qAnswer, q._answer)
										};
									}
									return q;
								})
							}
						}
						return paper;
					})
				}
			};

		default:
			return state;
	}
};

export default library;