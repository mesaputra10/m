import { AsyncStorage } from 'react-native';
import { searchProduct } from '../../helpers/fetch-data';
import ActionTypes from '../../store/action-types';

export function startSearch(keyword) {
  return {
    type: ActionTypes.PRODUCTS_SEARCH,
    keyword
  };
}

export const fetchSearch = (keyword: string) => dispatch => {
  dispatch(startSearch(keyword));
  return searchProduct(keyword).then(data => {
    dispatch(productsData(keyword, data));
  });
};

export const productsData = (keyword, data) => ({
  type: ActionTypes.PRODUCTS_DATA_LIST,
  keyword,
  products: data.hits,
  totalPage: data.total.totalPages,
  totalProducts: data.total.totalCount
});

export default {
  fetchSearch
};
