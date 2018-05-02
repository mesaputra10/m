import ActionTypes from '../../store/action-types';
import { Action } from 'redux';
import { DataItem } from 'antd-mobile/lib/grid/PropsType';

const initialState = {
  products: [],
  isFetching: false,
  keyword: '',
  totalPage: 0,
  totalProducts: 0,
  showFilter: false
};

export interface Product extends DataItem {
  productId: string;
  productName: string;
  offerNormalPrice: number;
  offerSpecialPrice: number;
  variantPrice: number;
  variantSkuNo: string;
  variantImageThumbnail: string;
}

interface SearchAction extends Action {
  type: ActionTypes.PRODUCTS_SEARCH;
  keyword: string;
}

interface SearchResultAction extends Action {
  type: ActionTypes.PRODUCTS_DATA_LIST;
  keyword: string;
  products: Product[];
  totalPage: number;
  totalProducts: number;
}

interface FilterProducts extends Action {
  type: ActionTypes.PRODUCTS_FILTER;
  showFilter: boolean;
}

type SearchActions = SearchAction | SearchResultAction | FilterProducts;

const reducer = (state = initialState, action: SearchActions) => {
  if (action.type === ActionTypes.PRODUCTS_SEARCH) {
    return Object.assign({}, state, {
      isFetching: true,
      keyword: action.keyword
    });
  }
  if (action.type === ActionTypes.PRODUCTS_DATA_LIST) {
    if (state.isFetching && action.keyword === state.keyword) {
      return Object.assign({}, state, {
        isFetching: false,
        products: action.products,
        totalPage: action.totalPage,
        totalProducts: action.totalProducts
      });
    }
    return Object.assign({}, state, {
      isFetching: false
    });
  }
  if (action.type === ActionTypes.PRODUCTS_FILTER) {
    return Object.assign({}, state, {
      showFilter: action.showFilter
    });
  }
  return state;
};

export default reducer;
