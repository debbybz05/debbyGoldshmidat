import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Alert} from 'react-bootstrap';
import CategoriesTable from './CategoriesTable';
import SaveCategoryView from './SaveCategoryView';
import ViewCategory from './ViewCategory';
import TopToolbar from'../toolbar/TopToolbar';
import {getCategories,changeDisplaySaveCategory,changeDisplayViewCategory,saveNewCategory} from '../../actions/';
import {setErrorNewCategory,setSelectedCategory,deleteCategory,editCategory,setErrorDeleteCategory} from '../../actions/';

class Categories extends Component{

    componentDidMount() {
        var {getCategories,setErrorDeleteCategory} = this.props;
        setErrorDeleteCategory("");
        getCategories();
    }

	render(){
        let {categories,changeDisplaySaveCategory,displaySaveCategory} =this.props;
        let {setErrorNewCategory,errorNewCategory,setSelectedCategory} =this.props;
        let {changeDisplayViewCategory,displayViewCategory,saveNewCategory,errorDeleteCategory} =this.props;
        let saveCategory,selectedCategory,typeFunction;
        if(this.state){
            saveCategory=this.state.func;
        }
        if(categories)
            categories.map( (cat) => {
                if(cat.selected)
                    selectedCategory=cat
                return cat;
            })
        if(saveCategory===saveNewCategory)
            typeFunction="add";
        else typeFunction="edit"
        return (
            <div>
                <TopToolbar onAdd={this.handleAddCategory.bind(this)} 
                    onEdit={this.handleEditCategory.bind(this)} 
                    onView={this.handleViewCategory.bind(this)} 
                    onRemove={this.handleDeleteCategory.bind(this)}  />
                <CategoriesTable categories={categories}
                    setSelectedCategory={setSelectedCategory} />
                <SaveCategoryView changeDisplayStatus={changeDisplaySaveCategory} 
                    display={displaySaveCategory} 
                    saveCategory={saveCategory}
                    setError={setErrorNewCategory}
                    error={errorNewCategory}
                    category={selectedCategory}
                    typeFunction={typeFunction} />
                <ViewCategory changeDisplayStatus={changeDisplayViewCategory} 
                    display={displayViewCategory} 
                    category={selectedCategory} />
                {
                    errorDeleteCategory
                    ?<div className="row  ">
                        <Alert bsStyle="warning">
                            <strong>error!</strong> {errorDeleteCategory}
                        </Alert>
                    </div>  
                    :null 

                }
                 
            </div>
        )
	}
    handleAddCategory(event){
        var {changeDisplaySaveCategory,saveNewCategory,setErrorDeleteCategory} = this.props;
        setErrorDeleteCategory("");
        this.setState({ func: saveNewCategory});
        changeDisplaySaveCategory(true);
    }
    handleEditCategory(event){
        var {changeDisplaySaveCategory,editCategory,setErrorDeleteCategory,categories} = this.props;
        setErrorDeleteCategory("");
        this.setState({ func: editCategory});
        let isExistInLocation=false, isRowSelected=false;
        categories.map( (cat) => {
            if(cat.selected){
                isRowSelected=true;
                if(cat.allowedDelete>0)
                    isExistInLocation=true; 
            }  
            return cat;
        })
        if(isExistInLocation)
            setErrorDeleteCategory("cant edit category exist in location.")
        else if(!isRowSelected)
            setErrorDeleteCategory("cant edit, category not selected.")
        else changeDisplaySaveCategory(true);
    }
    handleViewCategory(event){
        var {changeDisplayViewCategory,setErrorDeleteCategory,categories} = this.props;
        setErrorDeleteCategory("");
        let isRowSelected=false;
        categories.map( (cat) => {
            if(cat.selected){
                isRowSelected=true;
            }  
            return cat;
        })
        if(!isRowSelected)
            setErrorDeleteCategory("cant view, category not selected.")
        else changeDisplayViewCategory(true);
    }
    handleDeleteCategory(event){
        var {deleteCategory,categories,setErrorDeleteCategory} = this.props;
        setErrorDeleteCategory("")
        let isExistInLocation=false,isRowSelected=false;
        categories.map( (cat) => {
            if(cat.selected){
                isRowSelected=true;
                if(cat.allowedDelete>0)
                    isExistInLocation=true; 
            }  
            return cat;
        })
        if(isExistInLocation)
            setErrorDeleteCategory("cant remove category exist in location.")
        else if(!isRowSelected)
            setErrorDeleteCategory("cant remove, category not selected.")
        else deleteCategory();
    }
};

Categories.propTypes = {
    categories: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string,
        name: React.PropTypes.string,
        selected: React.PropTypes.bool,
        allowedDelete: React.PropTypes.number
    })),
    getCategories: PropTypes.func,
    changeDisplaySaveCategory: PropTypes.func,
    displaySaveCategory: React.PropTypes.bool,
    changeDisplayViewCategory: PropTypes.func,
    displayViewCategory: React.PropTypes.bool,
    saveNewCategory: PropTypes.func,
    editCategory: PropTypes.func,
    setErrorNewCategory: PropTypes.func,
    errorNewCategory:React.PropTypes.string,
    setSelectedCategory:PropTypes.func,
    deleteCategory : PropTypes.func,
    setErrorDeleteCategory : PropTypes.func,
    errorDeleteCategory: PropTypes.string
};

const mapStateToProps = (state) => {
    let errorNewCategory=(state.category.errorNewCategory==="" ? null : state.category.errorNewCategory)
    let errorDeleteCategory=(state.category.errorDeleteCategory==="" ? null : state.category.errorDeleteCategory)
    return {  
       categories: state.category.categories,
       displaySaveCategory: state.category.displaySaveCategory,
       displayViewCategory: state.category.displayViewCategory,
       errorNewCategory: errorNewCategory,
       errorDeleteCategory: errorDeleteCategory
    };
};
export default connect(mapStateToProps,{getCategories:getCategories, 
    changeDisplaySaveCategory:changeDisplaySaveCategory,
    changeDisplayViewCategory:changeDisplayViewCategory,
    saveNewCategory:saveNewCategory,
    setErrorNewCategory:setErrorNewCategory,
    setSelectedCategory:setSelectedCategory,
    deleteCategory:deleteCategory,
    editCategory:editCategory,
    setErrorDeleteCategory:setErrorDeleteCategory})(Categories);

