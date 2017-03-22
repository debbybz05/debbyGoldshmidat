import React, {Component, PropTypes} from 'react';
import { DropdownButton, MenuItem} from 'react-bootstrap';

class TopLocationToolbar extends Component{

	render(){
		let {setActionOnTable,categories} = this.props;
		return (
        	<div>
        		<div className="col-md-3 col-sm-3 col-xs-3"></div>
        		<div className="col-md-3 col-sm-3 col-xs-3">
		        	<DropdownButton bsSize="large" title="Sort" id="dropdown-size-large">
		        		<MenuItem onSelect={() => setActionOnTable({action:"None"})} >None</MenuItem>
						<MenuItem onSelect={() => setActionOnTable({action:"Sort"})} >Alphabetical By Name</MenuItem>
						<MenuItem onSelect={() => setActionOnTable({action:"Group"})}>Group By Category</MenuItem>
					</DropdownButton>
				</div>
				<div className="col-md-3 col-sm-3 col-xs-3">
					<DropdownButton bsSize="large" title="Filter" id="dropdown-size-large">
						<MenuItem onSelect={() => setActionOnTable({action:"None"})} >None</MenuItem>
					{categories 
						?categories.map( (category) => { 
							return (
								<MenuItem onSelect={() => setActionOnTable({action:"Filter",value:category.name})}
									key={category.id} >{category.name}
								</MenuItem>
							)
						})
						: null
					}
					</DropdownButton>
				</div>
			</div>
		)
	}
	
};

TopLocationToolbar.propTypes = {
	setActionOnTable: PropTypes.func,
	categories: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string,
        name: React.PropTypes.string
    }))
};

export default TopLocationToolbar;

