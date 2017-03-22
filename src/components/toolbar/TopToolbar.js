import React, {Component, PropTypes} from 'react';
import { ButtonGroup, Button} from 'react-bootstrap';

class TopToolbar extends Component{

	render(){
		let {onAdd,onEdit,onView,onRemove} = this.props;
        return (
        	<div>
	        	<ButtonGroup justified>
	        		<ButtonGroup bsSize="large" >
						<Button onClick={() => onView()} bsStyle="info">view</Button>
					</ButtonGroup>
					<ButtonGroup bsSize="large" >
						<Button onClick={() => onRemove()} bsStyle="info">remove</Button>
					</ButtonGroup>
					<ButtonGroup bsSize="large" >
						<Button onClick={() => onAdd()} bsStyle="info">add</Button>
					</ButtonGroup>
					<ButtonGroup bsSize="large" >
						<Button onClick={() => onEdit()} bsStyle="info">edit</Button>
					</ButtonGroup>
				</ButtonGroup>
				<h2>My Locations app</h2>
			</div>
		)
	}
};

TopToolbar.propTypes = {
	onAdd: PropTypes.func,
	onEdit: PropTypes.func,
	onView: PropTypes.func,
	onRemove: PropTypes.func
};

export default TopToolbar;

