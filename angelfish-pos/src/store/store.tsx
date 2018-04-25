import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import signInReducer from '../screens/signin/reducer';
import searchReducer from '../screens/home/reducer';
import { NetInfo } from 'react-native';
import { ActionTypes } from './action-types';

const globalReducer = async () => {
  const isConnected = await NetInfo.isConnected.fetch().then(isConnected => isConnected);
  if (ActionTypes.GLOBAL_CONNECTION) {
    return Object.assign(
      {},
      {
        type: ActionTypes.GLOBAL_CONNECTION,
        isConnected
      }
    );
  }
};

const reducers = combineReducers({
  signInReducer,
  searchReducer,
  globalReducer
});
export const store = createStore(reducers, applyMiddleware(thunk));

export default store;
