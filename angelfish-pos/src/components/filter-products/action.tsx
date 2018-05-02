import ActionTypes from '../../store/action-types';
import { categories } from '../../helpers/fetch-data';

export const setFilterCategory = (selectedCategoryId, selectedCategoryName) => dispatch =>
  dispatch({
    type: ActionTypes.SET_FILTER_CATEGORY,
    selectedCategoryId,
    selectedCategoryName
  });

export const fetchCategories = (parentId: string = undefined) => dispatch => {
  return categories(parentId).then(data =>
    dispatch({
      type: ActionTypes.CATEGORIES_LIST,
      categories: data
    })
  );
};
