import { AsyncStorage } from 'react-native';
import { searchProduct, FilterParams, categories } from '../../helpers/fetch-data';
import ActionTypes from '../../store/action-types';
import { SearchResultAction, SearchAction } from './reducer';
import { FilterProducts } from '../../components/filter-products';
import { Product } from '../../bmd';
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const startLoading = () => ({
  type: ActionTypes.IS_LOADING,
  isLoading: true
});

export const endLoading = () => ({
  type: ActionTypes.IS_LOADING,
  isLoading: false
});

export function startSearch(keyword): SearchAction {
  return {
    type: ActionTypes.PRODUCTS_SEARCH,
    keyword
  };
}

export const fetchSearch = (
  keyword: string,
  page: number = 1,
  filterParams: FilterParams = {}
) => dispatch => {
  dispatch(startSearch(keyword));
  return searchProduct(keyword, page, filterParams).then(data => {
    let cond = data.hits !== undefined || data.facets.aggregationBrand !== undefined;
    if (data.hits !== undefined || data.facets.aggregationBrand !== undefined) {
      dispatch(productsData(keyword, page, filterParams, data));
    }
  });
};

export const productsData = (keyword, page, filterParams, data): SearchResultAction => ({
  type: ActionTypes.PRODUCTS_DATA_LIST,
  keyword,
  page,
  products: Product.fromPlain(data.hits),
  totalPage: data.total.totalPages,
  totalProducts: data.total.totalCount,
  brands: data.facets.aggregationBrand,
  priceRange: data.facets.aggregationPriceRange
});

export const fetchCategories = () => async dispatch => {
  dispatch({ type: ActionTypes.CATEGORIES_LOADING });
  let data = await categories();
  return dispatch({ type: ActionTypes.CATEGORIES_LIST, categories: data });
};

export const setRemoveFilter = () => dispatch => {
  dispatch(setDefaultFilterCategory());
  dispatch(setDefaultFilterBrand());
  dispatch(setValueFilterPrices(0, 0));
  dispatch({
    type: ActionTypes.PRODUCTS_FILTER,
    showFilter: false
  });
};

export const setRemoveFilterCategory = () => dispatch => {
  dispatch(setDefaultFilterCategory());
};

export const setRemoveFilterBrands = () => dispatch => {
  dispatch(setDefaultFilterBrand());
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
    selectedBrands: []
  });

export const resetProductsList = () => ({ type: ActionTypes.PRODUCTS_RESET });

export const emptyProductsData = (): SearchResultAction => ({
  type: ActionTypes.PRODUCTS_DATA_LIST,
  keyword: '',
  products: [],
  totalPage: 0,
  totalProducts: 0,
  brands: [],
  page: 0,
  priceRange: null
});

export const setShowFilter = data => dispatch =>
  dispatch({
    type: ActionTypes.PRODUCTS_FILTER,
    showFilter: data
  });

export const setFilterBrands = selectedBrands => dispatch =>
  dispatch({
    type: ActionTypes.SET_FILTER_BRAND,
    selectedBrands
  });

export const setChildCategory = data => dispatch =>
  dispatch({
    type: ActionTypes.PRODUCT_FILTER_CHILD_CATEGORY,
    childCategory: data
  });

export const setChildBrand = data => dispatch =>
  dispatch({
    type: ActionTypes.PRODUCT_FILTER_CHILD_BRAND,
    childBrand: data
  });

export const setValueFilterPrices = (min, max) => dispatch =>
  dispatch({
    type: ActionTypes.PRODUCTS_FILTER_PRICES_VALUE,
    minPriceRange: min,
    maxPriceRange: max
  });

export const setShowSearchResults = data => dispatch =>
  dispatch({
    type: ActionTypes.SHOW_SEARCH_RESULTS_LIST,
    showSearchResults: data
  });

export const setShowParentCategory = data => dispatch =>
  dispatch({
    type: ActionTypes.SHOW_CATEGORY_PARENT,
    showParentCategory: data
  });
