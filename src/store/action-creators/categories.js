import C from '../constants';

export const addCategoryAction = (category) => ({
	type: C.ADD_CATEGORY,
	payload: category,
});
export const removeCategoryAction = (categoryId) => ({
	type: C.DELETE_CATEGORY,
	payload: categoryId,
});
export const updateCategoryListAction = (categories) => ({
	type: C.UPDATE_CATEGORY_LIST,
	payload: categories,
});
