import { Action } from 'redux';
import { ActionTypes } from './action-types';

interface GlobalAction extends Action {
  type: ActionTypes.GLOBAL_CONNECTION;
  isConnected: boolean;
}

const initialGlobalState = {
  isConnected: true,
  isServerError: false,
  isTokenExpired: false,
};
const globalReducer = (state = initialGlobalState, action: GlobalAction) => {
  if (action.type === ActionTypes.GLOBAL_CONNECTION) {
    return Object.assign({}, state, {
      isConnected: action.isConnected,
    });
  } else if (action.type == ActionTypes.SERVER_ERROR) {
    return { ...state, isServerError: true };
  } else if (action.type == ActionTypes.AUTH_EXPIRED) {
    return { ...state, isTokenExpired: true };
  } else if (action.type == ActionTypes.ACTION_LOGOUT) {
    // reset state
    return { ...state, isTokenExpired: false, isServerError: false };
  } else if (
    [
      ActionTypes.SERVER_RETRY,
      ActionTypes.PRODUCTS_DATA_LIST,
      ActionTypes.CATEGORIES_LIST,
      ActionTypes.PRODUCTS_DATA_LIST_RECOMMENDATION,
    ].indexOf(action.type) > -1
  ) {
    return { ...state, isServerError: false };
  } else return state;
};

export default globalReducer;
