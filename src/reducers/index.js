import { combineReducers } from 'redux';
import category from './category';
import location from './location';
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

const Reducer = combineReducers({
	category,
	location,
	routing: routerReducer,
    form: formReducer 
});

export default Reducer;
