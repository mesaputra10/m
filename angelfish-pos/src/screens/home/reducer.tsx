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
  showFilterCategory: false,
  showFilterBrands: false,
  selectedCategoryId: '',
  selectedCategoryName: '',
  selectedBrandId: 0,
  selectedBrandName: '',
  page: 1,
  brands: [],
  selectedBrands: [],
  childBrand: false,
  childCategory: false,
  isLoading: true
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

export interface SearchAction extends Action {
  type: ActionTypes.PRODUCTS_SEARCH;
  keyword: string;
}

export interface SearchResultAction extends Action {
  type: ActionTypes.PRODUCTS_DATA_LIST;
  keyword: string;
  products: Product[];
  totalPage: number;
  totalProducts: number;
  brands: Brand[];
  page: number;
  priceRange: { min: string; max: string };
}

export interface FilterProducts extends Action {
  type: ActionTypes.PRODUCTS_FILTER;
  showFilter: boolean;
}

interface FilterCategoryProducts extends Action {
  type: ActionTypes.PRODUCTS_FILTER_CATEGORY;
  showFilterCategory: boolean;
}

interface FilterBrandsProducts extends Action {
  type: ActionTypes.PRODUCTS_FILTER_BRANDS;
  showFilterBrands: boolean;
}

interface ActionFilterCategoryInterface extends Action {
  type: ActionTypes.SET_FILTER_CATEGORY;
  selectedCategoryId: string;
  selectedCategoryName: string;
}

export interface ActionCategoriesInterface extends Action {
  type: ActionTypes.CATEGORIES_LIST;
  categories: any[];
}

export interface ActionFilterBrandInterface extends Action {
  type: ActionTypes.SET_FILTER_BRAND;
  selectedBrands: any[];
}

interface ActionChildCategoryInterface extends Action {
  type: ActionTypes.PRODUCT_FILTER_CHILD_CATEGORY;
  childCategory: boolean;
}

interface ActionChildBrandInterface extends Action {
  type: ActionTypes.PRODUCT_FILTER_CHILD_BRAND;
  childBrand: boolean;
}

interface ActionIsLoadingInterface extends Action {
  type: ActionTypes.IS_LOADING;
  isLoading: boolean;
}

const reducer = (
  state = initialState,
  action:
    | SearchAction
    | SearchResultAction
    | FilterProducts
    | FilterCategoryProducts
    | FilterBrandsProducts
    | ActionFilterCategoryInterface
    | ActionCategoriesInterface
    | ActionFilterBrandInterface
    | ActionChildCategoryInterface
    | ActionChildBrandInterface
    | ActionIsLoadingInterface
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
          page: action.page,
          priceRange: action.priceRange
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
    case ActionTypes.PRODUCTS_FILTER_CATEGORY: {
      return Object.assign({}, state, {
        showFilterCategory: action.showFilterCategory
      });
    }
    case ActionTypes.PRODUCTS_FILTER_BRANDS: {
      return Object.assign({}, state, {
        showFilterBrands: action.showFilterBrands
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
        selectedBrands: action.selectedBrands
      });
    }
    case ActionTypes.PRODUCT_FILTER_CHILD_CATEGORY: {
      return Object.assign({}, state, {
        childCategory: action.childCategory
      });
    }
    case ActionTypes.PRODUCT_FILTER_CHILD_BRAND: {
      return Object.assign({}, state, {
        childBrand: action.childBrand
      });
    }
    case ActionTypes.IS_LOADING: {
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    }
    default: {
      return state;
    }
  }
};

export default reducer;
