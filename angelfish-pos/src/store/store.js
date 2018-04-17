import { createStore, applyMiddleware } from 'redux'
import SignInReducer from '../screens/signin/reducer'

export default function configureStore() {
  let store = createStore(
    SignInReducer
  )

  return store;
}