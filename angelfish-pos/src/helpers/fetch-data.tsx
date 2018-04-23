import axios from 'axios';
import { AsyncStorage } from 'react-native';
import Expo from 'expo';

const keyAccessToken = '@KeyAccessToken';
const keyRefreshToken = '@KeyRefreshToken';
const keyAuthorization = 'Basic NDlmZTc3NTQtZjgyZS00OTA3LTkyMjgtN2MyNmE1Y2Q2MjQ0OkRySkxGMDhDYTR3SUVwUFlHOGl0aUxha3gyU0pZTmdu';
const headerContentType = 'application/x-www-form-urlencoded';
const baseURL: string = 'https://b2c-api-staging.bhinneka.com';
const deviceId = Expo.Constants.deviceId;

export const fetchDataLogin = async (inputParams: object={}) => {
  try {
    const requestApi = await axios({
      baseURL,
      method: 'POST',
      url: '/api/auth',
      params: {
        'grantType': 'password',
        'username': 'naufal.prasetyo@bhinneka.com',
        'password': 'wannabenakeD1',
        'deviceId': deviceId,
      },
      headers: {
        'Authorization': keyAuthorization,
        'Content-Type': headerContentType,
      },
    });
    await setUserToken(requestApi.data);
    console.log('Response: ', requestApi);
    console.log('Device ID: ', deviceId);
    if (requestApi.status === 200) return requestApi.data;
  } catch(e) {
    console.log('there was an error');
    console.log(e);
  }
};

export const fetchData = async (url: string, method: string, inputParams: object={}) => {
  const accessToken = await AsyncStorage.getItem(keyAccessToken);
  try {
    const requestApi = await axios({
      baseURL,
      method,
      url,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      params: inputParams,
    });
    console.log('Response data: ', requestApi.data);
    console.log('Response status: ', requestApi.status);
    if (requestApi.status === 200) return requestApi.data;
  } catch(e) {
    console.log('there was an error fetchData()');
    console.log('Error: ', e);
    if (e.response.status === 401) {
      refreshToken(fetchData(url, method, inputParams));
    }
  }
};

const setUserToken = async (data) => {
  await AsyncStorage.multiSet([
    [keyAccessToken, data.accessToken],
    [keyRefreshToken, data.refreshToken],
  ]);
};

const refreshToken = async (cb) => {
  const oldAccessToken = await AsyncStorage.getItem(keyAccessToken);
  const refreshToken = await AsyncStorage.getItem(keyRefreshToken);
  try {
    const requestRefreshToken = await axios({
      baseURL,
      method: 'POST',
      url: '/api/auth',
      headers: {
        'Authorization': keyAuthorization,
        'Content-Type': headerContentType,
      },
      params: {
        grantType: 'refresh_token',
        refreshToken,
        oldAccessToken,
      },
    });
    if (requestRefreshToken.status === 200) {
      await removeUserToken();
      await setUserToken(requestRefreshToken.data);
      cb();
      console.log('Response: ', requestRefreshToken);
      return requestRefreshToken.data;
    } else {
      //force logout
      console.log('force logout');
      await removeUserToken();
    }
  } catch (e) {
    console.log('Error refresh token');
    console.log(e);
    await removeUserToken();
  } 
};

const removeUserToken = async () => {
  await AsyncStorage.multiRemove([
    keyAccessToken,
    keyRefreshToken,
  ]);
};

export default {
  fetchDataLogin,
  fetchData,
};