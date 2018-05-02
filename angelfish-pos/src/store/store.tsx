import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ActionTypes from './action-types';
import signInReducer from '../screens/signin/reducer';
import searchReducer from '../screens/home/reducer';
import globalReducer from './global-state';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();

const reducers = combineReducers({
  signInReducer,
  searchReducer,
  globalReducer
});
export const store = createStore(reducers, applyMiddleware(thunk, loggerMiddleware));

export default store;
