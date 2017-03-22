import { createStore } from 'redux';
import reducers from './reducers/';

const configureStore = () => {
	//const persistedState = loadState();
	const persistedState = undefined;
	const store = createStore(
		reducers
		,persistedState
		,window.devToolsExtension ? window.devToolsExtension() : undefined
	);
	return store;
};

export default configureStore;
