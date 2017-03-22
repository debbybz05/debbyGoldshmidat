import React, {Component, PropTypes} from 'react';

class LocationTable extends Component{

	render(){

        let {locations,actionOnTable} =this.props;
        let newLocations=[];

        if((actionOnTable)&&(actionOnTable.action==="Sort")) {
            newLocations=this.sortAlphabetical(locations)
        }
        else if((actionOnTable)&&(actionOnTable.action==="None")){
            newLocations=locations;
        }
        else if((actionOnTable)&&(actionOnTable.action==="Group")){
            newLocations = this.groupBy(locations, function(item)
            {
              return [item.category];
            });
            newLocations = newLocations.reduce(function(a, b) {
              return a.concat(b);
            });
            
        }
        else if((actionOnTable)&&(actionOnTable.action==="Filter")){
            newLocations=locations.filter(location =>(location.category===actionOnTable.value));
        }
        else newLocations=locations;
		return (
            <div>
                <table className="table">
                    <thead>
                         <tr>
                            <th>#</th>
                            <th>Location Name </th>
                            <th>Location Address </th>
                            <th colSpan="2">Location Coordinates </th>
                            <th>Location Category </th>
                        </tr>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>a</th>
                            <th>b</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            newLocations ?          
                                newLocations.map( (loc) => { 
                                    
                                    return (
                                        <tr onClick={this.onSelectRow.bind(this,loc.id,loc.name,loc.address,
                                            loc.coordinates.a,loc.coordinates.b,loc.category)} 
                                            className={loc.selected ? "warning" : ""}
                                            key={loc.id} >
                                            <td>{loc.id}</td>
                                            <td>{loc.name}</td>
                                            <td>{loc.address}</td>
                                            <td>{loc.coordinates.a}</td>
                                            <td> {loc.coordinates.b}</td>
                                            <td>{loc.category}</td>
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
    sortAlphabetical(location){
        var sortLocations = location.slice(0);
        sortLocations.sort(function(a, b) {
            return a.name > b.name;
        });
        return sortLocations;
    }
    groupBy( array , f )
    {
      var groups = {};
      array.forEach( function( o )
      {
        var group = JSON.stringify( f(o) );
        groups[group] = groups[group] || [];
        groups[group].push( o );  
      });
      return Object.keys(groups).map( function( group )
      {
        return groups[group]; 
      })
    }


    onSelectRow(id,name,address,a,b,category,event){
        event.preventDefault();
        let {setSelectedLocation} = this.props;
        let selected={id:id,name:name,address:address,coordinates:{a:a,b:b},category:category};
        setSelectedLocation(selected);
    }
};

LocationTable.propTypes = {
    locations: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string,
        name: React.PropTypes.string,
        coordinates: React.PropTypes.shape({
            a: React.PropTypes.string,
            b: React.PropTypes.string
        }),
        category: React.PropTypes.string,
        selected: React.PropTypes.bool
    })),
    setSelectedLocation:PropTypes.func,
    actionOnTable: React.PropTypes.shape({
        action:PropTypes.string,
        value: PropTypes.string
    })
};

export default LocationTable;

