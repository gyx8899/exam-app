import {visibilityFilters} from "../../site/stores/constants/exam";

export function isRightAnswer(answer, _answer) {
	if (!answer || !answer.length) {
		return undefined;
	}
	return answer.sort().toString() === _answer.sort().toString();
}

export function getFilterData(filter, data, exercise) {
	const {SHOW_ALL, SHOW_WRONG, SHOW_UN_DO} = visibilityFilters;

	switch (filter) {
		case SHOW_ALL:
			return data;
		case SHOW_WRONG:
			return data.filter(q => (exercise[q.index] && exercise[q.index].isRight === false));
		case SHOW_UN_DO:
			return data.filter(q => (!exercise[q.index] || exercise[q.index].isRight === undefined));
		default:
			return data;
	}
}