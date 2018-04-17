const initialState = {
    loggedIn: false,
    status: '',
  }
  
  const SignInReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ACTION_LOGIN": {
        return Object.assign({}, state, {
          loggedIn: action.loggedIn,
          status: action.status,
        })
      }
      default: {
        return initialState
      }
    }
  };
  
  export default SignInReducer;