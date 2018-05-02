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

interface SearchAction extends Action {
  type: ActionTypes.PRODUCTS_DATA_LIST;
  products: Product[];
  totalPage: number;
  totalProducts: number;
}

const reducer = (state = initialState, action: SearchAction) => {
  switch (action.type) {
    case ActionTypes.PRODUCTS_DATA_LIST: {
      return Object.assign({}, state, {
        products: action.products,
        totalPage: action.totalPage,
        totalProducts: action.totalProducts
      });
    }
    default: {
      return initialState;
    }
  }
};

export default reducer;
