import * as types from '../constants/ActionTypes'

const location = (state={},action) => {
	switch  (action.type) {
	case types.GET_LOCATIONS:
		return Object.assign({}, state, {
			locations: action.locations
		});
	case types.CHANGE_DISPLAY_SAVE_LOCATION:
		return Object.assign({}, state, {
			displaySaveLocation: action.status
		});
	case types.CHANGE_DISPLAY_VIEW_LOCATION:
		return Object.assign({}, state, {
			displayViewLocation: action.status
		});
	case types.GET_CATEGORIES:
		return Object.assign({}, state, {
			categories: action.categories
		});
	case types.SAVE_NEW_LOCATION:
		return Object.assign({}, state, {
			locations: action.locations
		});
	case types.EDIT_LOCATION:
		return Object.assign({}, state, {
			locations: action.locations
		});
	case types.SET_ERROR_NEW_LOCATION:
		return Object.assign({}, state, {
			errorNewLocation: action.error
		});
	case types.SET_SELECTED_LOCATION:
		return Object.assign({}, state, {
			locations: action.locations
		});
	case types.DELETE_LOCATION:
		return Object.assign({}, state, {
			locations: action.locations
		});
	case types.SET_ACTION_ON_TABLE:
		return Object.assign({}, state, {
			actionOnTable: action.actionType
		});
	case types.SET_ERROR_DELETE_LOCATION:
		return Object.assign({}, state, {
			errorDeleteLocation: action.error
		});
	
	default:
		return state;
	}
};

export default location;