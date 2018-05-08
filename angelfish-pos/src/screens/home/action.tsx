import { AsyncStorage } from 'react-native';
import { searchProduct } from '../../helpers/fetch-data';
import ActionTypes from '../../store/action-types';
import { SearchResultAction, SearchAction } from './reducer';
import { FilterProducts } from '../../components/filter-products';
import { Product } from '../../bmd';

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
