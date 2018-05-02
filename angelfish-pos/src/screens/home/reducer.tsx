import ActionTypes from '../../store/action-types';
import { Action } from 'redux';
import { DataItem } from 'antd-mobile/lib/grid/PropsType';

// type productType = {
//   productId: number;
//   productName: string;
//   variantImageThumbnail: string;
//   variantSkuNo: number;
//   variantPrice: number;
//   offerDiscountPercentage: number;
//   offerSpecialPrice: number;
// };
const initialState = {
  products: [],
  isFetching: false,
  keyword: '',
  totalPage: 0,
  totalProducts: 0
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

interface SearchAction extends Action<ActionTypes.PRODUCTS_SEARCH> {
  keyword: string;
}

interface SearchResultAction extends Action<ActionTypes.PRODUCTS_DATA_LIST> {
  keyword: string;
  products: Product[];
  totalPage: number;
  totalProducts: number;
}

type SearchActions = SearchAction | SearchResultAction;

const reducer = (state = initialState, action: SearchActions) => {
  if (action.type === ActionTypes.PRODUCTS_SEARCH) {
    return Object.assign({}, state, {
      isFetching: true,
      keyword: action.keyword
    });
  } else if (action.type === ActionTypes.PRODUCTS_DATA_LIST) {
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
  return state;
};

export default reducer;
