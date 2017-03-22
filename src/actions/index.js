import * as types from '../constants/ActionTypes'

export function getLocations(){
	let locations= JSON.parse(localStorage.getItem('locations'))||[];
	return({
		type: types.GET_LOCATIONS,
		locations
	})
};
export const changeDisplaySaveLocation = (status) => ({
	type: types.CHANGE_DISPLAY_SAVE_LOCATION,
	status
});
export const changeDisplayViewLocation = (status) => ({
	type: types.CHANGE_DISPLAY_VIEW_LOCATION,
	status
});
export function saveNewLocation(newLocation){
	let locations=saveNewLocationToStorage(newLocation);
	return({
		type: types.SAVE_NEW_LOCATION,
		locations
	})
};
function updateCategoryAllowedDelete(categoryName,allowedDelete){
	let categories= JSON.parse(localStorage.getItem('categories'))||[];
	categories=categories.map(category => {
		let nums=category.allowedDelete;
		let newAllowDelete= (allowedDelete? --nums : ++nums);
		newAllowDelete = (newAllowDelete<0 ? 0 :newAllowDelete);
		return (category.name===categoryName ? { ...category, allowedDelete:newAllowDelete} : category) });
	localStorage.setItem('categories', JSON.stringify(categories));
}
function saveNewLocationToStorage(newLocation) {
	let locations= JSON.parse(localStorage.getItem('locations'))||[];
	newLocation.id='id' + (new Date()).getTime();
	locations.push(newLocation);
	localStorage.setItem('locations', JSON.stringify(locations));
	let locationsAfterSave= JSON.parse(localStorage.getItem('locations'))||[];
	updateCategoryAllowedDelete(newLocation.category,false);
	return locationsAfterSave;
}
export function editLocation(newLocation){
	let locations=editLocationToStorage(newLocation);
	return({
		type: types.EDIT_LOCATION,
		locations
	})
};
function editLocationToStorage(newLocation) {
	let categoryAllowDelete,categoryNotAllowDelete;
	let locations= JSON.parse(localStorage.getItem('locations'))||[];
	locations=locations.map(location => {
		if((location.id===newLocation.id)&&(location.category!==newLocation.category)){
			categoryAllowDelete=location.category;
			categoryNotAllowDelete=newLocation.category;
		}
		return (location.id===newLocation.id ? newLocation : location) });
	localStorage.setItem('locations', JSON.stringify(locations));
	let locationsAfterEdit= JSON.parse(localStorage.getItem('locations'))||[];
	if(categoryAllowDelete) 
		updateCategoryAllowedDelete(categoryAllowDelete,true);
	if(categoryNotAllowDelete)
		updateCategoryAllowedDelete(categoryNotAllowDelete,false);
	return locationsAfterEdit;
}

export const setErrorNewLocation = (error) => ({
	type: types.SET_ERROR_NEW_LOCATION,
	error
});
export function setSelectedLocation(locationToSelect){
	let locations=setSelectedLocationToStorage(locationToSelect);
	return({
		type: types.SET_SELECTED_LOCATION,
		locations
	})
};
function setSelectedLocationToStorage(locationToSelect) {
	let locations= JSON.parse(localStorage.getItem('locations'))||[];
	locations=locations.map(location => {
        return { ...location, selected: (location.id === locationToSelect.id) }
    })
    localStorage.setItem('locations', JSON.stringify(locations));
    let locationsAftersetSelected= JSON.parse(localStorage.getItem('locations'))||[];
	return locationsAftersetSelected;
}

export function deleteLocation(){
	let locations=deleteLocationFromStorage();
	return({
		type: types.DELETE_LOCATION,
		locations
	})
};
function deleteLocationFromStorage() {
	let categoryName;
	let locations= JSON.parse(localStorage.getItem('locations'))||[];
	locations = locations.filter(location =>{
		if(location.selected) categoryName=location.category;
		return(!location.selected)})
	localStorage.setItem('locations', JSON.stringify(locations));
	let locationsAfterDelete= JSON.parse(localStorage.getItem('locations'))||[];
	updateCategoryAllowedDelete(categoryName,true);
	return locationsAfterDelete;
}
export function setActionOnTable(actionType){
	return({
		type: types.SET_ACTION_ON_TABLE,
		actionType
	})
}
export const setErrorDeleteLocation = (error) => ({
	type: types.SET_ERROR_DELETE_LOCATION,
	error
});


//category
export function getCategories(){
	let categories =JSON.parse(localStorage.getItem('categories')) || [];
	return({
		type: types.GET_CATEGORIES,
		categories
	})
}
export const changeDisplaySaveCategory = (status) => ({
	type: types.CHANGE_DISPLAY_SAVE_CATEGORY,
	status
});
export const changeDisplayViewCategory = (status) => ({
	type: types.CHANGE_DISPLAY_VIEW_CATEGORY,
	status
});
export function saveNewCategory(newCategory){
	let categories=saveNewCategoryToStorage(newCategory);
	return({
		type: types.SAVE_NEW_CATEGORY,
		categories
	})
};
function saveNewCategoryToStorage(newCategory) {
	let categories= JSON.parse(localStorage.getItem('categories'))||[];
	newCategory.id='id' + (new Date()).getTime();
	newCategory.allowedDelete=0;
	categories.push(newCategory);
	localStorage.setItem('categories', JSON.stringify(categories));
	let categoriesAfterSave= JSON.parse(localStorage.getItem('categories'))||[];
	return categoriesAfterSave;
}
export function editCategory(newCategory){
	let categories=editCategoryToStorage(newCategory);
	return({
		type: types.EDIT_CATEGORY,
		categories
	})
};
function editCategoryToStorage(newCategory) {
	let categories= JSON.parse(localStorage.getItem('categories'))||[];
	categories=categories.map(category => {
		return (category.id===newCategory.id ? newCategory : category) });
	localStorage.setItem('categories', JSON.stringify(categories));
	let categoriesAfterEdit= JSON.parse(localStorage.getItem('categories'))||[];
	return categoriesAfterEdit;
}

export const setErrorNewCategory = (error) => ({
	type: types.SET_ERROR_NEW_CATEGORY,
	error
});
export const setErrorDeleteCategory = (error) => ({
	type: types.SET_ERROR_DELETE_CATEGORY,
	error
});
export function setSelectedCategory(CategoryToSelect){
	let categories=setSelectedCategoryToStorage(CategoryToSelect);
	return({
		type: types.SET_SELECTED_CATEGORY,
		categories
	})
};
function setSelectedCategoryToStorage(CategoryToSelect) {
	let categories= JSON.parse(localStorage.getItem('categories'))||[];
	categories=categories.map(category => {
        return { ...category, selected: (category.id === CategoryToSelect.id) }
    })
    localStorage.setItem('categories', JSON.stringify(categories));
    let categoriesAftersetSelected= JSON.parse(localStorage.getItem('categories'))||[];
	return categoriesAftersetSelected;
}

export function deleteCategory(){
	let categories=deleteCategoryFromStorage();
	return({
		type: types.DELETE_CATEGORY,
		categories
	})
};
function deleteCategoryFromStorage() {
	let categories= JSON.parse(localStorage.getItem('categories'))||[];
	categories = categories.filter(category =>(!category.selected));
	localStorage.setItem('categories', JSON.stringify(categories));
	let categoriesAfterDelete= JSON.parse(localStorage.getItem('categories'))||[];
	return categoriesAfterDelete;
}
