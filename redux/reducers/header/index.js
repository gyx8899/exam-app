import {SET_SUBTITLE, SHOW_BACK_BUTTON, RESET_HEADER} from "../../constants/header";

const initialState = {
	subTitle: '',
	showBackButton: false
};

const header = (state = initialState, action) => {
	switch (action.type) {
		case SET_SUBTITLE:
			return {
				...state,
				subTitle: action.subTitle
			};
		case SHOW_BACK_BUTTON:
			return {
				...state,
				showBackButton: action.showBackButton
			};
		case RESET_HEADER:
			return initialState;
		default:
			return state;
	}
};

export default header;