import ActionTypes from '../../store/action-types';
import { categories } from '../../helpers/fetch-data';

export const fetchCategories = () => dispatch => {
  return categories().then(data =>
    dispatch({
      type: ActionTypes.CATEGORIES_LIST,
      categories: data
    })
  );
};

export const setFilterCategory = (selectedCategoryId, selectedCategoryName) => dispatch => {
  dispatch({
    type: ActionTypes.SET_FILTER_CATEGORY,
    selectedCategoryId,
    selectedCategoryName
  });
};
