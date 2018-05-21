import ActionTypes from '../../store/action-types';
import { categories } from '../../helpers/fetch-data';

export const setFilterCategory = (selectedCategoryId, selectedCategoryName?) => dispatch => {
  dispatch({
    type: ActionTypes.SET_FILTER_CATEGORY,
    selectedCategoryId,
    selectedCategoryName
  });
};
