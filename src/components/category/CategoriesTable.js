import React, {Component, PropTypes} from 'react';

class CategoriesTable extends Component{

	render(){
        let {categories} =this.props;
		return (
            <div>
                <table className="table">
                    <thead>
                         <tr>
                            <th>#</th>
                            <th>Category Name </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories ?          
                                categories.map( (cat) => { 
                                    return (
                                        <tr onClick={this.onSelectRow.bind(this,cat.id,cat.name)} 
                                            className={cat.selected ? "warning" : ""}
                                            key={cat.id} >
                                            <td>{cat.id}</td>
                                            <td>{cat.name}</td>
                                        </tr>
                                    );
                                        
                                })
                                : null
                        }
                    </tbody>
                </table>
            </div>
        );
	}
    onSelectRow(id,name,event){
        event.preventDefault();
        let {setSelectedCategory} = this.props;
        let selected={id:id,name:name};
        setSelectedCategory(selected);
    }
};

CategoriesTable.propTypes = {
    categories: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string,
        name: React.PropTypes.string,
        selected: React.PropTypes.bool,
        allowedDelete: React.PropTypes.number
    })),
    setSelectedCategory:PropTypes.func
};

export default CategoriesTable;

