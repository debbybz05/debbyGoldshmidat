import React, {Component, PropTypes} from 'react';
import { Modal} from 'react-bootstrap';

class ViewCategory extends Component{
    
    render(){
        var {display,category} = this.props;
        let id,name;
        if(category){
            id=category.id;
            name=category.name;
        }
        return (
            <div>
                
                <Modal show={display} onHide={this.handleButtonClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>View Category</Modal.Title>
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
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" onClick={this.handleButtonClose.bind(this)} className="btn dark btn-outline" data-dismiss="modal">Close</button>
                    </Modal.Footer>
                    </Modal>
            </div>
        );
    }
    handleButtonClose(event) {
        let {changeDisplayStatus} = this.props;
        changeDisplayStatus(false);
    }
}

ViewCategory.propTypes = {
    category: React.PropTypes.shape({
        id: React.PropTypes.string,
        name: React.PropTypes.string,
        selected: React.PropTypes.bool,
        allowedDelete: React.PropTypes.number
    }),
    changeDisplayStatus: PropTypes.func,
    display: React.PropTypes.bool,
};

export default ViewCategory;