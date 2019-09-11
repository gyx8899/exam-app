import {isRightType} from "../../app/config";
import {visibilityFilters} from "../../site/stores/constants/exam";

export function isRightAnswer(answer, _answer) {
	if (!answer || !answer.length) {
		return isRightType.INIT;
	}
	return (answer.sort().toString() === _answer.sort().toString() ? isRightType.RIGHT : isRightType.WRONG)
}

export function getFilterData(filter, data) {
	const {SHOW_ALL, SHOW_WRONG, SHOW_UN_DO} = visibilityFilters;

	switch (filter) {
		case SHOW_ALL:
			return data;
		case SHOW_WRONG:
			return data.filter(q => q.isRight === isRightType.WRONG);
		case SHOW_UN_DO:
			return data.filter(q => q.isRight === isRightType.INIT);
		default:
			return data;
	}
}