import axios from 'axios';
import { AsyncStorage } from 'react-native';
import Expo from 'expo';
import { stringify } from 'query-string';
import { filter } from 'minimatch';

const keyAccessToken = '@KeyAccessToken';
const keyRefreshToken = '@KeyRefreshToken';
const keyAuthorization =
  'Basic NDlmZTc3NTQtZjgyZS00OTA3LTkyMjgtN2MyNmE1Y2Q2MjQ0OkRySkxGMDhDYTR3SUVwUFlHOGl0aUxha3gyU0pZTmdu';
const headerContentType = 'application/x-www-form-urlencoded';
const baseURL: string = 'https://b2c-api-staging.bhinneka.com';
const deviceId = Expo.Constants.deviceId;

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export enum GrantType {
  ANONYMOUS = 'anonymous',
  PASSWORD = 'password',
  AZURE = 'azure',
  FACEBOOK = 'facebook',
  GOOGLE = 'google'
}

export const fetchDataLogin = async (username: string, password: string) => {
  try {
    let token = await login(username, password, deviceId);
    await setUserToken(token);
    return token;
  } catch (err) {
    // handle on server error
    console.log(err);
  }
};

export function login(
  username: string,
  password: string,
  deviceId: string,
  grantType = GrantType.PASSWORD
) {
  return new Promise<Tokens>((resolve, reject) => {
    axios({
      baseURL,
      method: 'POST',
      url: '/api/auth',
      data: stringify({
        grantType,
        username,
        password,
        deviceId
      }),
      headers: {
        Authorization: keyAuthorization,
        'Content-Type': headerContentType
      }
    })
      .then(requestApi => {
        if (requestApi.status === 200) resolve(requestApi.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

const setUserToken = async (data: Tokens) => {
  await AsyncStorage.multiSet([
    [keyAccessToken, data.accessToken],
    [keyRefreshToken, data.refreshToken]
  ]);
};

export async function getUserToken() {
  let keys = [keyAccessToken, keyRefreshToken];
  let token: Tokens = { accessToken: '', refreshToken: '' };
  await AsyncStorage.multiGet(keys, (err, stores) => {
    stores.map((result, i, store) => {
      // get at each store's key/value so you can work with it
      let key = store[i][0];
      let value = store[i][1];
      if (key === keyAccessToken) {
        token.accessToken = value;
      } else if (key === keyRefreshToken) {
        token.refreshToken = value;
      }
    });
  });
  return token;
}

export function refreshToken(oldAccessToken: string, refreshToken: string) {
  return new Promise<Tokens>((resolve, reject) => {
    axios({
      baseURL,
      method: 'POST',
      url: '/api/auth',
      data: stringify({
        grantType: 'refresh_token',
        oldAccessToken,
        refreshToken
      }),
      headers: {
        Authorization: keyAuthorization,
        'Content-Type': headerContentType
      }
    })
      .then(requestApi => {
        if (requestApi.status === 200) resolve(requestApi.data);
      })
      .catch(err => reject(err));
  });
}

const removeUserToken = async () => {
  await AsyncStorage.multiRemove([keyAccessToken, keyRefreshToken]);
};

export function fetchData(
  url: string,
  method: string,
  inputParams = {},
  token: Tokens,
  retry = 0
): Promise<any> {
  return new Promise((resolve, reject) => {
    axios({
      baseURL,
      method,
      url,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token.accessToken}`
      },
      params: inputParams
    })
      .then(requestApi => {
        if (requestApi.status === 200) {
          resolve(requestApi.data);
        }
      })
      .catch(err => {
        if (err.response.status == 401) {
          if (retry > 1) reject(Error('Maximum retry reached'));

          refreshToken(token.accessToken, token.refreshToken)
            .then(newToken => {
              setUserToken(newToken)
                .then(val => console.log('success setusertoken'))
                .catch(err => console.log('failed setusertoken'));
              resolve(fetchData(url, method, inputParams, newToken, retry + 1));
            })
            .catch(err => reject(err));
        } else reject(err);
      });
  });
}

export async function searchProduct(
  keyword: string,
  filterParams: any = {},
  pageNumber = 1,
  pageSize = 21
) {
  const categoryId = filterParams.categoryId === undefined ? '' : filterParams.categoryId;
  let tokens = await getUserToken();
  return fetchData(
    '/api/products/search',
    'GET',
    {
      'filter[query]': keyword,
      'page[size]': pageSize,
      'page[number]': pageNumber,
      'filter[categoryId]': categoryId
    },
    tokens
  );
}

export async function categories(parentId: string = undefined) {
  let tokens = await getUserToken();
  return fetchData('/api/categories', 'GET', parentId, tokens);
}
