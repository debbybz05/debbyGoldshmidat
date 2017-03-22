import React, {Component, PropTypes} from 'react';
import { Modal, Alert} from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';


class EditLocation extends Component{

    componentWillReceiveProps(props) {
        let {location}=props;
       if((location)&&(location.coordinates)){
            if(location.coordinates.a){
                this.setState({lat:location.coordinates.a});
                this.setState({currentLat:location.coordinates.a});
            }
            if(location.coordinates.b){
                this.setState({lng:location.coordinates.b});
                this.setState({currentLng:location.coordinates.b});
            }
        }
        else  navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({currentLat:position.coords.latitude,currentLng: position.coords.longitude});
        })
    }
	
    render(){
        const AnyReactComponent = ({ text }) => <div style={{color:"red", fontWeight:"bold"}}>{text}</div>;
        var {display,location,categories,error,typeFunction} = this.props;
        let id,name,address,category;
        if((typeFunction==="edit")&&(location)){
            id=location.id;
            name=location.name;
            address=location.address;
            category=location.category;
        }
        let currentLat,currentLng,lat,lng;
        if(this.state){
            currentLat=this.state.currentLat;
            currentLng=this.state.currentLng;
            lat=this.state.lat;
            lng=this.state.lng;
        }
		return (
            <div>
                
                <Modal show={display} onHide={this.handleButtonClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Save Location</Modal.Title>
                        <button onClick={this.handleButtonClose.bind(this)} type="button" className="close" data-dismiss="modal" aria-hidden="true"></button>           
                        {
                        error
                        ?<div className="row">
                            <Alert bsStyle="warning">
                                <strong>error!</strong> {error}
                            </Alert>
                        </div>
                        :null
                        }
                    </Modal.Header>
                    <Modal.Body>
                    <div>
                        {id
                            ? <div className="row">
                                <div className="col-md-4"> Id </div>
                                <div className="col-md-8">
                                    {id}
                                </div>
                            </div>
                            :null
                        }
                       <div className="row">
                            <div className="col-md-4"> Category </div>
                            <div className="col-md-8">
                                <select ref="category" type="text" className="form-fill input-big" placeholder="" id="object_tagsinput_value">
                                    {
                                        categories 
                                        ? categories.map( (cat) => {
                                            return <option selected={category===cat.name} key={cat.id}> {cat.name}</option>
                                        })
                                        : null    
                                                    
                                    }
                                </select>
                                </div>
                        </div>
                        <div className="row top-form">
                            <div className="col-md-4"> Name </div>
                            <div className="col-md-8">
                                <input placeholder={name} ref="name" type="text" className="form-fill input-big" id="object_tagsinput_value" />
                            </div>
                        </div>
                        <div className="row top-form ">
                            <div className="col-md-4"> Address </div>
                            <div className="col-md-8">
                                <input placeholder={address} ref="address" type="text" className="form-fill input-big" id="object_tagsinput_value" />
                            </div>
                        </div>
                        <div className="row top-form ">
                            <div className="col-md-4">Choose Coordinates: </div>
                            <section style={{height: "25em"}}>
                                <GoogleMapReact
                                center={{lat: parseFloat(currentLat), lng: parseFloat(currentLng)}}
                                zoom={14}
                                onClick={this.handleMapClick.bind(this)}
                              >
                              {lat?
                               <AnyReactComponent
                                    lat={lat}
                                    lng={lng}
                                    text={'here!'}
                                />
                                :null}
                              </GoogleMapReact>
                                   
                                </section>
                            
                        </div>
                        
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={this.handleButtonClose.bind(this)} className="btn dark btn-outline" data-dismiss="modal">Close</button>
                        <button type="button" onClick={this.handleButtonSave.bind(this)} className="btn green" data-dismiss="modal">Save</button>
                    </Modal.Footer>
                    </Modal>
            </div>
		);
	}
    handleMapClick(event){
        this.setState({lat:event.lat,lng: event.lng});
    }
    handleButtonClose(event) {
        let {changeDisplayStatus,setError} = this.props;
        setError("")
        changeDisplayStatus(false);
    }
    handleButtonSave(event) {
        let {changeDisplayStatus,saveLocation,setError,location} = this.props;
        let id,name,address,a,b,category;
        if(location){
            id = location.id;
            name = this.refs.name.value==="" ? location.name : this.refs.name.value;
            address = this.refs.address.value==="" ? location.address : this.refs.address.value;
            if((this.state)&&(this.state.lat))
                a = this.state.lat.toString();
            else a=location.coordinates.a;
             if((this.state)&&(this.state.lng))
                b = this.state.lng.toString();
            else b=location.coordinates.b;
            category = this.refs.category.value==="" ? location.category : this.refs.category.value;
            setError("")
            const reqParams={id:id,name:name,address:address,coordinates:{a:a, b:b},category:category,selected:false};
            saveLocation(reqParams);
            changeDisplayStatus(false);
        }
        else{
            name = this.refs.name.value;
            address = this.refs.address.value;
            category = this.refs.category.value;
            if((name==="")||(address==="")||(!this.state)||(!this.state.lat)||(!this.state.lng))
                setError("need complete all properties.")
            else{
                a = this.state.lat.toString();
                b = this.state.lng.toString();
                setError("")
                const reqParams={name:name,address:address,coordinates:{a:a, b:b},category:category,selected:false};
                saveLocation(reqParams);
                changeDisplayStatus(false);
            }
        }
    }
}

EditLocation.propTypes = {
    location: React.PropTypes.shape({
        id: React.PropTypes.string,
        name: React.PropTypes.string,
        address: React.PropTypes.string,
        coordinates: React.PropTypes.shape({
            a: React.PropTypes.string,
            b: React.PropTypes.string
        }),
        category: React.PropTypes.string,
        selected: React.PropTypes.bool
    }),
    changeDisplayStatus: PropTypes.func,
    display: React.PropTypes.bool,
    categories: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string,
        name: React.PropTypes.string
    })),
    saveLocation: PropTypes.func,
    setError: PropTypes.func,
    error:React.PropTypes.string,    
    typeFunction: PropTypes.string
};

export default EditLocation;