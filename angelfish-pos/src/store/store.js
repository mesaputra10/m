import { createStore, applyMiddleware } from 'redux'
import SignInReducer from '../screens/SigninReducer'

export default function configureStore() {
  let store = createStore(
    SignInReducer
  )

  return store;
}