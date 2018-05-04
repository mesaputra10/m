import { AsyncStorage } from 'react-native';
import { searchProduct } from '../../helpers/fetch-data';
import ActionTypes from '../../store/action-types';

export function startSearch(keyword) {
  return {
    type: ActionTypes.PRODUCTS_SEARCH,
    keyword
  };
}

export const fetchSearch = (keyword: string, filterParams: any = {}) => dispatch => {
  dispatch(startSearch(keyword));
  return searchProduct(keyword, filterParams).then(data => {
    if (data.hits !== undefined || data.facets.aggregationBrand !== undefined) {
      dispatch(productsData(keyword, data));
    }
  });
};

export const productsData = (keyword, data) => ({
  type: ActionTypes.PRODUCTS_DATA_LIST,
  keyword,
  products: data.hits,
  totalPage: data.total.totalPages,
  totalProducts: data.total.totalCount,
  brands: data.facets.aggregationBrand
});

export const setFilter = data => dispatch => {
  dispatch({
    type: ActionTypes.PRODUCTS_FILTER,
    showFilter: data
  });
};

export const setRemoveFilter = () => dispatch => {
  dispatch(setDefaultFilterCategory());
  dispatch(setDefaultFilterBrand());
  dispatch({
    type: ActionTypes.PRODUCTS_FILTER,
    showFilter: false
  });
};

export const setDefaultFilterCategory = () => dispatch =>
  dispatch({
    type: ActionTypes.SET_FILTER_CATEGORY,
    selectedCategoryId: '',
    selectedCategoryName: ''
  });

export const setDefaultFilterBrand = () => dispatch =>
  dispatch({
    type: ActionTypes.SET_FILTER_BRAND,
    selectedBrandId: '',
    selectedBrandName: ''
  });

export const emptyProductsData = () => ({
  type: ActionTypes.PRODUCTS_DATA_LIST,
  keyword: '',
  products: [],
  totalPage: 0,
  totalProducts: 0,
  brands: []
});
