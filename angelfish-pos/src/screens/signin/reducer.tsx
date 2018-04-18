import ActionTypes from '../../store/action-types';

const initialState = {
    loggedIn: false,
    status: '',
  }
  
  const SignInReducer = (state = initialState, action) => {
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