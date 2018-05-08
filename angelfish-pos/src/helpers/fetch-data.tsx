import axios from 'axios';
import { AsyncStorage } from 'react-native';
import Expo from 'expo';
import { stringify } from 'query-string';
import { filter } from 'minimatch';
import { Category } from '../bmd';

const keyAccessToken = '@KeyAccessToken';
const keyRefreshToken = '@KeyRefreshToken';
const keyAuthorization =
  'Basic NDlmZTc3NTQtZjgyZS00OTA3LTkyMjgtN2MyNmE1Y2Q2MjQ0OkRySkxGMDhDYTR3SUVwUFlHOGl0aUxha3gyU0pZTmdu';
const headerContentType = 'application/x-www-form-urlencoded';
const baseURL: string = 'http://api-krab-dev.bhinneka.com:8080';
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
  let token = await login(username, password, deviceId);
  await setUserToken(token);
  return token;
};

export async function login(
  username: string,
  password: string,
  deviceId: string,
  grantType = GrantType.PASSWORD
) {
  let requestApi = await axios({
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
  });
  if (requestApi.status === 200) return requestApi.data;
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

export async function refreshToken(oldAccessToken: string, refreshToken: string) {
  let requestApi = await axios({
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
  });
  if (requestApi.status === 200) return requestApi.data;
}

const removeUserToken = async () => {
  await AsyncStorage.multiRemove([keyAccessToken, keyRefreshToken]);
};

class ServerError extends Error {}

export async function fetchData(
  url: string,
  method: string,
  inputParams = {},
  token: Tokens,
  retry = 0
) {
  try {
    let requestApi = await axios({
      baseURL,
      method,
      url,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token.accessToken}`
      },
      params: inputParams
    });
    if (requestApi.status === 200) {
      return requestApi.data;
    }
  } catch (err) {
    if (err.response.status == 401) {
      if (retry > 1) throw Error('Maximum retry reached');

      let newToken = await refreshToken(token.accessToken, token.refreshToken);
      await setUserToken(newToken);
      return fetchData(url, method, inputParams, newToken, retry + 1);
    }
    if (err.response.status >= 500 && err.response.status < 600) throw new ServerError(err);
  }
  return undefined;
}

/*
TODO:
- include facet parameter boolean flag
- filterParams handles when set to null
*/
export async function searchProduct(
  keyword: string,
  pageNumber: number = 1,
  filterParams: any = {},
  pageSize = 21
) {
  const categoryId = filterParams.categoryId === undefined ? '' : filterParams.categoryId;
  const brands = filterParams.brands === undefined ? '' : filterParams.brands;
  const min = filterParams.minPriceRange === undefined ? '' : filterParams.minPriceRange;
  const max = filterParams.maxPriceRange === undefined ? '' : filterParams.maxPriceRange;
  let tokens = await getUserToken();
  return fetchData(
    '/api/products/search',
    'GET',
    {
      include: 'facets',
      'filter[query]': keyword,
      'page[size]': pageSize,
      'page[number]': pageNumber,
      'filter[categoryId]': categoryId,
      'filter[brandId]': brands,
      'filter[price]': { min, max }
    },
    tokens
  );
}

const MAX_CATEGORY_LEVEL = 4;

function remapCategories(data: any, level = 1) {
  if (level > MAX_CATEGORY_LEVEL) return;
  let childrenkey = 'categoryTree' + (level + 1);
  if (data != null) {
    data = Object.assign([], data); // copy
    return data.map(category => {
      if (childrenkey in category && category[childrenkey] != null) {
        category['children'] = remapCategories(category[childrenkey], level + 1);
        delete category[childrenkey];
        return category;
      } else return category;
    });
  }
  return data;
}

export async function categories(parentId: string = undefined) {
  let res = await searchProduct('', 1, {}, 1);
  return Category.fromPlain(remapCategories(res.facets.categoryTree1));
}
