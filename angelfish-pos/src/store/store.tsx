import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import signInReducer from '../screens/signin/reducer';
import searchReducer from '../screens/home/reducer';

const reducers = combineReducers({
  signInReducer,
  searchReducer,
});
export const store = createStore(
  reducers,
  applyMiddleware(thunk),
);

export default store;