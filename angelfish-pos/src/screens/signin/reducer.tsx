import ActionTypes from '../../store/action-types';
import {Action} from 'redux';

const initialState = {
  loggedIn: false,
  status: '',
};

interface SignInAction extends Action {
  type: ActionTypes.ACTION_LOGIN,
  loggedIn: boolean,
  status: string,
}
  
const SignInReducer = (state = initialState, action: SignInAction) => {
  switch (action.type) {
    case ActionTypes.ACTION_LOGIN: {
      if (action.loggedIn) {
        return Object.assign({}, state, {
          loggedIn: action.loggedIn,
          status: action.status,
        });
      } else {
        return initialState;
      }
    }
    default: {
      return initialState
    }
  }
};
  
export default SignInReducer;