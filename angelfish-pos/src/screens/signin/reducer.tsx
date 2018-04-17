const initialState = {
    loggedIn: false
  }
  
  const SignInReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ACTION_LOGIN": {
        return Object.assign({}, state, {
          loggedIn: action.loggedIn
        })
      }
      default: {
        return initialState
      }
    }
  };
  
  export default SignInReducer;