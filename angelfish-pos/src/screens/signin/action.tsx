import { AsyncStorage } from 'react-native';
import fetchData from '../../helpers/fetch-data';
import ActionTypes from '../../store/action-types';

export const login = (email: string, password: string) => (dispatch) => {
  console.log('login processing...');
  return fetchData('/login', 'POST', {
    email,
    password,
  }, (data) => {
    if (data.loggedIn) {
      dispatch(loginData(data));
      AsyncStorage.setItem("userToken", data.token);
    }   
  });
};

export const loginData = data => ({
  type: ActionTypes.ACTION_LOGIN,
  loggedIn: data.loggedIn,
  status: data.status,
});

export default {
  login,
};