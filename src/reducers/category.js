import * as types from '../constants/ActionTypes'

const category= (state={},action) => {
	switch  (action.type) {
	case types.GET_CATEGORIES:
		return Object.assign({}, state, {
			categories: action.categories
		});
	case types.CHANGE_DISPLAY_SAVE_CATEGORY:
		return Object.assign({}, state, {
			displaySaveCategory: action.status
		});
	case types.CHANGE_DISPLAY_VIEW_CATEGORY:
		return Object.assign({}, state, {
			displayViewCategory: action.status
		});
	case types.SAVE_NEW_CATEGORY:
		return Object.assign({}, state, {
			categories: action.categories
		});
	case types.EDIT_CATEGORY:
		return Object.assign({}, state, {
			categories: action.categories
		});
	case types.SET_ERROR_NEW_CATEGORY:
		return Object.assign({}, state, {
			errorNewCategory: action.error
		});
	case types.SET_ERROR_DELETE_CATEGORY:
		return Object.assign({}, state, {
			errorDeleteCategory: action.error
		});
	case types.SET_SELECTED_CATEGORY:
		return Object.assign({}, state, {
			categories: action.categories
		});
	case types.DELETE_CATEGORY:
		return Object.assign({}, state, {
			categories: action.categories
		});
	default:
		return state;
	}
};

export default category;