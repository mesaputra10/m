import ActionTypes from '../../store/action-types';
import { Action } from 'redux';

const initialState = {
  showFilter: false
};

interface ActionInterface extends Action {
  type: ActionTypes.PRODUCTS_FILTER;
  showFilter: boolean;
}

const reducer = (state = initialState, action: ActionInterface) => {
  switch (action.type) {
    case ActionTypes.PRODUCTS_FILTER: {
      return Object.assign({}, state, {
        showFilter: action.showFilter
      });
    }
    default: {
      return state;
    }
  }
};

export default reducer;
