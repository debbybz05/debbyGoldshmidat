import React from 'react'
import { IndexRoute, Route } from 'react-router'
import App from './components/App';
import Category from './components/category/CategoryPage';
import Location from './components/location/LocationPage';

const Routes = (
	<Route path='/' component={App} >
		<IndexRoute component={Location} />
		<Route path='categories' component={Category} />
		<Route path='locations' component={Location} />
	</Route>
);

export default Routes;