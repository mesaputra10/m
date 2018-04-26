import { Action } from 'redux';
import { ActionTypes } from './action-types';

interface GlobalAction extends Action {
  type: ActionTypes.GLOBAL_CONNECTION;
  isConnected: boolean;
}

const initialGlobalState = {
  isConnected: true
};
const globalReducer = (state = initialGlobalState, action: GlobalAction) => {
  if (action.type === ActionTypes.GLOBAL_CONNECTION) {
    return Object.assign({}, state, {
      isConnected: action.isConnected
    });
  }
  return state;
};

export default globalReducer;
