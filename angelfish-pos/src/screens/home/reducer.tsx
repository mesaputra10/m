import ActionTypes from '../../store/action-types';
import { Action } from 'redux';
import { DataItem } from 'antd-mobile/lib/grid/PropsType';
import { Brand } from '../../bmd';

const initialState = {
  products: [],
  isFetching: false,
  keyword: '',
  totalPage: 0,
  totalProducts: 0,
  showFilter: false,
  selectedCategoryId: '',
  selectedCategoryName: '',
  selectedBrandId: 0,
  selectedBrandName: '',
  page: 1,
  brands: []
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
  brands: Brand[];
  page: number;
}

interface FilterProducts extends Action {
  type: ActionTypes.PRODUCTS_FILTER;
  showFilter: boolean;
}

interface ActionFilterCategoryInterface extends Action {
  type: ActionTypes.SET_FILTER_CATEGORY;
  selectedCategoryId: string;
  selectedCategoryName: string;
}

interface ActionCategoriesInterface extends Action {
  type: ActionTypes.CATEGORIES_LIST;
  categories: any[];
}

interface ActionFilterBrandInterface extends Action {
  type: ActionTypes.SET_FILTER_BRAND;
  selectedBrandId: number;
  selectedBrandName: string;
}

const reducer = (
  state = initialState,
  action:
    | SearchAction
    | SearchResultAction
    | FilterProducts
    | ActionFilterCategoryInterface
    | ActionCategoriesInterface
    | ActionFilterBrandInterface
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
          totalProducts: action.totalProducts,
          brands: action.brands,
          keyword: action.keyword,
          page: action.page
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
    case ActionTypes.SET_FILTER_BRAND: {
      return Object.assign({}, state, {
        selectedBrandId: action.selectedBrandId,
        selectedBrandName: action.selectedBrandName
      });
    }
    default: {
      return state;
    }
  }
};

export default reducer;
