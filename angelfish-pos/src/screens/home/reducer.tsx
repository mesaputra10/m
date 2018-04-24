import ActionTypes from '../../store/action-types';
import { Action } from 'redux';

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
};

interface SearchAction extends Action {
  type: ActionTypes.PRODUCTS_DATA_LIST,
  products: any[],
}
  
const reducer = (state = initialState, action: SearchAction) => {
  switch (action.type) {
    case ActionTypes.PRODUCTS_DATA_LIST: {
      return Object.assign({}, state, {
        products: action.products,
      });
    }
    default: {
      return initialState;
    }
  }
};
  
export default reducer;