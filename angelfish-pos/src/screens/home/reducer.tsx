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
  categories: any[];
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

interface ActionInterface extends Action {
  type: ActionTypes.SET_FILTER_CATEGORY;
  selectedCategoryId: string;
  selectedCategoryName: string;
}

interface ActionCategoriesInterface extends Action {
  type: ActionTypes.CATEGORIES_LIST;
  categories: any[];
}

const reducer = (
  state = initialState,
  action:
    | SearchAction
    | SearchResultAction
    | FilterProducts
    | ActionInterface
    | ActionCategoriesInterface
) => {
  switch (action.type) {
    case ActionTypes.PRODUCTS_SEARCH: {
      return Object.assign({}, state, {
        isFetching: true,
        keyword: action.keyword
      });
    }
    case ActionTypes.PRODUCTS_DATA_LIST: {
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
    case ActionTypes.PRODUCTS_FILTER: {
      return Object.assign({}, state, {
        showFilter: action.showFilter
      });
    }
    case ActionTypes.SET_FILTER_CATEGORY: {
      return Object.assign({}, state, {
        selectedCategoryId: action.selectedCategoryId,
        selectedCategoryName: action.selectedCategoryName
      });
    }
    case ActionTypes.CATEGORIES_LIST: {
      return { ...state, categories: action.categories };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
