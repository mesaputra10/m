import ActionTypes from '../../store/action-types';
export const setFilter = data => dispatch =>
  dispatch({
    type: ActionTypes.PRODUCTS_FILTER,
    showFilter: data
  });
