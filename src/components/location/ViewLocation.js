import React, {Component, PropTypes} from 'react';
import { Modal} from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';

class ViewLocation extends Component{
    
    componentDidMount() {
        this.setState({
          showMap: false,
        });
    }

    render(){
        const AnyReactComponent = ({ text }) => <div style={{color:"red", fontWeight:"bold"}}>{text}</div>;
        let {display,location} = this.props;
        let id,name,address,a,b,category;
        if(location){
            id=location.id;
            name=location.name;
            address=location.address;
            a=location.coordinates.a;
            b=location.coordinates.b;
            category=location.category;
        }
        let showMap;
        if(this.state){
            showMap=this.state.showMap
        }

        return (
            <div>
                     
                <Modal show={display} onHide={this.handleButtonClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>View Location</Modal.Title>
                        <button onClick={this.handleButtonClose.bind(this)} type="button" className="close" data-dismiss="modal" aria-hidden="true"></button>           
                    </Modal.Header>
                    <Modal.Body>
                    <div>
                        <div className="row ">
                            {"Id: "+id}
                        </div>
                        <div className="row ">
                            {"Name: "+name}
                        </div>
                        <div className="row top-form ">
                            {"Address: "+address}
                        </div>
                        <div className="row top-form ">
                            <div className="col-md-4"> Coordinates: </div>
                            <div className="col-md-4">
                                {"a: "+a}
                            </div>
                            <div className="col-md-4">
                                {"b: "+b}
                            </div>
                        </div>
                        <div className="row top-form ">
                            {"Category: "+category}
                        </div>
                        <div className="row top-form ">
                            <button type="button" onClick={this.handleButtonShowMap.bind(this)} className="btn dark btn-outline" data-dismiss="modal">Show In Map</button>
                        </div>
                        {
                            showMap 
                            ?<div>
                                <section style={{height: "25em"}}>
                                <GoogleMapReact
                                center={{lat: parseFloat(a), lng: parseFloat(b)}}
                                zoom={14}
                              >
                                <AnyReactComponent
                                    lat={a}
                                    lng={b}
                                    text={'here!'}
                                />
                              </GoogleMapReact>
                                   
                                </section>
                            </div>
                            :null
                        }
                        
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={this.handleButtonClose.bind(this)} className="btn dark btn-outline" data-dismiss="modal">Close</button>
                    </Modal.Footer>
                    </Modal>

            </div>
        );
    }
    handleButtonShowMap(event){
        this.setState({
            showMap: true
        });
    }

    handleButtonClose(event) {
        let {changeDisplayStatus} = this.props;
        changeDisplayStatus(false);
    }
}

ViewLocation.propTypes = {
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
};

export default ViewLocation;