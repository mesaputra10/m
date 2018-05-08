import { AsyncStorage } from 'react-native';
import { searchProduct } from '../../helpers/fetch-data';
import ActionTypes from '../../store/action-types';
import { SearchResultAction, SearchAction } from './reducer';
import { FilterProducts } from '../../components/filter-products';
import { Product } from '../../bmd';

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
  page: number = 0,
  filterParams: any = {}
) => dispatch => {
  dispatch(startSearch(keyword));
  return searchProduct(keyword, page, filterParams).then(data => {
    if (data.hits !== undefined || data.facets.aggregationBrand !== undefined) {
      dispatch(productsData(keyword, page, data));
    }
  });
};

export const productsData = (keyword, page, data): SearchResultAction => ({
  type: ActionTypes.PRODUCTS_DATA_LIST,
  keyword,
  page,
  products: Product.fromPlain(data.hits),
  totalPage: data.total.totalPages,
  totalProducts: data.total.totalCount,
  brands: data.facets.aggregationBrand,
  priceRange: data.facets.aggregationPriceRange
});

export const setRemoveFilter = () => dispatch => {
  dispatch(setDefaultFilterCategory());
  dispatch(setDefaultFilterBrand());
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

export const setShowFilterCategory = data => dispatch =>
  dispatch({
    type: ActionTypes.PRODUCTS_FILTER_CATEGORY,
    showFilterCategory: data
  });

export const setShowFilterBrands = data => dispatch =>
  dispatch({
    type: ActionTypes.PRODUCTS_FILTER_BRANDS,
    showFilterBrands: data
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
