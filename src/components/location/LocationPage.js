import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Alert} from 'react-bootstrap';
import LocationTable from './LocationTable';
import SaveLocationView from './SaveLocationView';
import ViewLocation from './ViewLocation';
import TopToolbar from'../toolbar/TopToolbar';
import TopLocationToolbar from'../toolbar/TopLocationToolbar';
import {getLocations,changeDisplaySaveLocation,changeDisplayViewLocation,getCategories,saveNewLocation} from '../../actions/';
import {setErrorNewLocation,setSelectedLocation,deleteLocation,editLocation,setActionOnTable,setErrorDeleteLocation} from '../../actions/';


class Locations extends Component{

    componentDidMount() {
        var {getLocations,getCategories,setErrorDeleteLocation} = this.props;
        getLocations();
        getCategories();
        setErrorDeleteLocation("");
    }

	render(){
        let {locations,changeDisplaySaveLocation,displaySaveLocation,categories} =this.props;
        let {setErrorNewLocation,errorNewLocation,setSelectedLocation,errorDeleteLocation} =this.props;
        let {changeDisplayViewLocation,displayViewLocation,saveNewLocation,setActionOnTable,actionOnTable} =this.props;
        let saveLocation,selectedLocation,typeFunction;
        if(this.state){
            saveLocation=this.state.func;
        }
        if(locations)
            locations.map( (loc) => {
                if(loc.selected)
                    selectedLocation=loc
                return loc;
            })
        if(saveLocation===saveNewLocation)
            typeFunction="add";
        else typeFunction="edit";
		return (
            <div>
                <TopToolbar onAdd={this.handleAddLocatiom.bind(this)} 
                    onEdit={this.handleEditLocatiom.bind(this)} 
                    onView={this.handleViewLocatiom.bind(this)} 
                    onRemove={this.handleDeleteLocation.bind(this)} />
                <TopLocationToolbar setActionOnTable={setActionOnTable}
                    categories={categories} />
                <LocationTable locations={locations}
                    setSelectedLocation={setSelectedLocation} 
                    actionOnTable={actionOnTable} />
                <SaveLocationView changeDisplayStatus={changeDisplaySaveLocation} 
                    display={displaySaveLocation} 
                    categories={categories}
                    saveLocation={saveLocation}
                    setError={setErrorNewLocation}
                    error={errorNewLocation}
                    location={selectedLocation}
                    typeFunction={typeFunction} />
                <ViewLocation changeDisplayStatus={changeDisplayViewLocation} 
                    display={displayViewLocation} 
                    location={selectedLocation} />
                {
                    errorDeleteLocation
                    ?<div className="row  ">
                        <Alert bsStyle="warning">
                            <strong>error!</strong> {errorDeleteLocation}
                        </Alert>
                    </div>  
                    :null 

                }
            </div>
        )
	}
    handleAddLocatiom(event){
        var {changeDisplaySaveLocation,saveNewLocation,setErrorDeleteLocation} = this.props;
        this.setState({ func: saveNewLocation});
        setErrorDeleteLocation("");
        changeDisplaySaveLocation(true);
    }
    handleEditLocatiom(event){
        var {changeDisplaySaveLocation,editLocation,setErrorDeleteLocation,locations} = this.props;
        this.setState({ func: editLocation});
        setErrorDeleteLocation("");
        let isRowSelected=false;
        locations.map( (loc) => {
            if(loc.selected){
                isRowSelected=true;
            }  
            return loc;
        })

       if(!isRowSelected)
            setErrorDeleteLocation("cant edit, location not selected.")
        else changeDisplaySaveLocation(true);
    }
    handleViewLocatiom(event){
        var {changeDisplayViewLocation,setErrorDeleteLocation,locations} = this.props;
        setErrorDeleteLocation("");
        let isRowSelected=false;
        locations.map( (loc) => {
            if(loc.selected){
                isRowSelected=true;
            }  
            return loc;
        })

       if(!isRowSelected)
            setErrorDeleteLocation("cant view, location not selected.")
        else changeDisplayViewLocation(true);
    }
    handleDeleteLocation(event){
        var {deleteLocation,locations,setErrorDeleteLocation} = this.props;
        setErrorDeleteLocation("")
        let isRowSelected=false;
        locations.map( (loc) => {
            if(loc.selected){
                isRowSelected=true;
            }  
            return loc;
        })

       if(!isRowSelected)
            setErrorDeleteLocation("cant remove, location not selected.")
        else deleteLocation();
    }
};

Locations.propTypes = {
	locations: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string,
        name: React.PropTypes.string,
        address: React.PropTypes.string,
        coordinates: React.PropTypes.shape({
            a: React.PropTypes.string,
            b: React.PropTypes.string
        }),
        category: React.PropTypes.string,
        selected: React.PropTypes.bool
    })),
    getLocations: PropTypes.func,
    changeDisplaySaveLocation: PropTypes.func,
    displaySaveLocation: React.PropTypes.bool,
    changeDisplayViewLocation: PropTypes.func,
    displayViewLocation: React.PropTypes.bool,
    categories: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string,
        name: React.PropTypes.string
    })),
    getCategories: PropTypes.func,
    saveNewLocation: PropTypes.func,
    editLocation: PropTypes.func,
    setErrorNewLocation: PropTypes.func,
    errorNewLocation:React.PropTypes.string,
    setSelectedLocation:PropTypes.func,
    deleteLocation : PropTypes.func,
    actionOnTable: React.PropTypes.shape({
        action:PropTypes.string,
        value: PropTypes.string
    }),
    setActionOnTable: PropTypes.func,
    setErrorDeleteLocation : PropTypes.func,
    errorDeleteLocation: PropTypes.string
};
const mapStateToProps = (state) => {
    let errorNewLocation=(state.location.errorNewLocation==="" ? null : state.location.errorNewLocation)
    let errorDeleteLocation=(state.location.errorDeleteLocation==="" ? null : state.location.errorDeleteLocation)
    return {  
       locations: state.location.locations,
       displaySaveLocation: state.location.displaySaveLocation,
       displayViewLocation: state.location.displayViewLocation,
       categories: state.location.categories,
       errorNewLocation: errorNewLocation,
       actionOnTable: state.location.actionOnTable,
       errorDeleteLocation: errorDeleteLocation
    };
};

export default connect(mapStateToProps,{getLocations:getLocations, 
    changeDisplaySaveLocation:changeDisplaySaveLocation,
    changeDisplayViewLocation:changeDisplayViewLocation,
    getCategories:getCategories,
    saveNewLocation:saveNewLocation,
    setErrorNewLocation:setErrorNewLocation,
    setSelectedLocation:setSelectedLocation,
    deleteLocation:deleteLocation,
    editLocation:editLocation,
    setActionOnTable:setActionOnTable,
    setErrorDeleteLocation:setErrorDeleteLocation})(Locations);


