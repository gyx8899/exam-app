import {TOGGLE_ANSWER, SET_VISIBILITY_FILTER, visibilityFilters} from "../../constants/exam";

const initialState = {
	showAnswer: false,
	visibilityFilter: visibilityFilters.SHOW_ALL
};

const config = (state = initialState, {type, filter}) => {
	switch(type) {
		case TOGGLE_ANSWER:
			return {
				...state,
				showAnswer: !state.showAnswer
			};
		case SET_VISIBILITY_FILTER:
			return {
				...state,
				visibilityFilter: filter
			};
		default:
			return state;
	}
};

export default config;