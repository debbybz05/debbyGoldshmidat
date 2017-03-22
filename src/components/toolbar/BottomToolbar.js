import React, {Component} from 'react';
import { ButtonGroup, Button} from 'react-bootstrap';

class BottomToolbar extends Component{

	render(){
		return (
        	<div className="page-footer">
        		<div className="page-footer-inner">
	        	<ButtonGroup justified>
	        		<ButtonGroup bsSize="large" >
						<Button bsStyle="info" onClick={this.handleButtonSetStatusPage.bind(this,"Category")}>Category</Button>
					</ButtonGroup>
					<ButtonGroup bsSize="large" >
						<Button bsStyle="info" onClick={this.handleButtonSetStatusPage.bind(this,"Location")}>Location</Button>
					</ButtonGroup>
				</ButtonGroup>
			</div></div>	
		)
	}
	handleButtonSetStatusPage(value,event){
		event.preventDefault();
		switch  (value) {
		case "Category":
			this.props.router.push('/categories');
		break;
		case "Location":
			this.props.router.push('/locations');
		break
		default:
			this.props.router.push('/');
		}
	}

};

export default BottomToolbar;

