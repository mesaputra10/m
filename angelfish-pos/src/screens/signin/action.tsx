import { AsyncStorage } from 'react-native';
import { fetchDataLogin } from '../../helpers/fetch-data';
import ActionTypes from '../../store/action-types';

export const login = (email: string, password: string) => dispatch => {
  return fetchDataLogin(email, password);
};

export const loginData = data => ({
  type: ActionTypes.ACTION_LOGIN,
  loggedIn: data.loggedIn,
  status: data.status
});

export default {
  login
};
