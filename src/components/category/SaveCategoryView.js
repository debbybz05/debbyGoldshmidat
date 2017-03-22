import React, {Component, PropTypes} from 'react';
import { Modal, Alert} from 'react-bootstrap';

class EditCategory extends Component{
	
    render(){
        var {display,category,error,typeFunction} = this.props;
        let id,name;
        if((typeFunction==="edit")&&(category)){
            id=category.id;
            name=category.name;
        }
		return (
            <div>
                
                <Modal show={display} onHide={this.handleButtonClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Save Category</Modal.Title>
                        <button onClick={this.handleButtonClose.bind(this)} type="button" className="close" data-dismiss="modal" aria-hidden="true"></button>           
                        {
                        error
                        ?<div className="row  ">
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
                            ? <div className="row ">
                                <div className="col-md-4"> Id </div>
                                <div className="col-md-8">
                                    {id}
                                </div>
                            </div>
                            :null
                        }
                       
                        <div className="row ">
                            <div className="col-md-4"> Name </div>
                            <div className="col-md-8">
                                <input placeholder={name} ref="name" type="text" className="form-fill input-big" id="object_tagsinput_value" />
                            </div>
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
    handleButtonClose(event) {
        let {changeDisplayStatus,setError} = this.props;
        setError("")
        changeDisplayStatus(false);
    }
    handleButtonSave(event) {
        let {changeDisplayStatus,saveCategory,setError,category} = this.props;
        let id,name;
        if(category){
            id = category.id;
            name = this.refs.name.value==="" ? category.name : this.refs.name.value;
            setError("")
            const reqParams={id:id,name:name,selected:false};
            saveCategory(reqParams);
            changeDisplayStatus(false);
        }
        else{
            name = this.refs.name.value;
            if(name==="")
                setError("need complete all properties.")
            else{
                setError("")
                const reqParams={name:name,selected:false};
                saveCategory(reqParams);
                changeDisplayStatus(false);
            }
        }
        
        
    }
}

EditCategory.propTypes = {
    category: React.PropTypes.shape({
        id: React.PropTypes.string,
        name: React.PropTypes.string,
        selected: React.PropTypes.bool,
        allowedDelete: React.PropTypes.number
    }),
    changeDisplayStatus: PropTypes.func,
    display: React.PropTypes.bool,
    saveCategory: PropTypes.func,
    setError: PropTypes.func,
    error:React.PropTypes.string,
    typeFunction: PropTypes.string
};

export default EditCategory;