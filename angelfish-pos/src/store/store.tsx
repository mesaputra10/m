import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ActionTypes from './action-types';
import signInReducer from '../screens/signin/reducer';
import homeReducer from '../screens/home/reducer';
import globalReducer from './global-state';
import { createLogger } from 'redux-logger';
import { Constants } from 'expo';

const reducers = combineReducers({
  signInReducer,
  homeReducer,
  globalReducer
});

if (Constants.manifest.extra.loggingRedux === false || Constants.manifest.releaseChannel) {
  var middlewares = applyMiddleware(thunk);
} else {
  let loggerMiddleware = createLogger();
  var middlewares = applyMiddleware(thunk, loggerMiddleware);
}
export const store = createStore(reducers, middlewares);

export default store;
