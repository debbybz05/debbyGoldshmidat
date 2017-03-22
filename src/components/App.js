import React, {Component} from 'react';
import './App.css';
//import './App.css';
import BottomToolbar from '../components/toolbar/BottomToolbar';
import { withRouter } from 'react-router';

class App extends Component {

	render() {
		var BottomToolbarWithRouter= withRouter(BottomToolbar);
		return (
			<div className="main"> 	
	        	<h1>hello!!!</h1>
		    	<div>
		          	{this.props.children}
		        </div>
		       <BottomToolbarWithRouter/>
		    </div>
		);
	}
}

export default App;

