import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import SignInReducer from '../screens/signin/reducer'

export default function configureStore() {
  let store = createStore(
    SignInReducer,
    applyMiddleware(thunk),
  )

  return store;
}