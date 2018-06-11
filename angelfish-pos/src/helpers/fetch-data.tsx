import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Constants } from 'expo';
import { stringify } from 'query-string';
import { filter } from 'minimatch';
import { Category, Offer, Variant, Installment, Stock } from '../bmd';
import { plainToClass } from 'class-transformer';

const keyAccessToken = '@KeyAccessToken';
const keyRefreshToken = '@KeyRefreshToken';
const keyAuthorization =
  'Basic NDlmZTc3NTQtZjgyZS00OTA3LTkyMjgtN2MyNmE1Y2Q2MjQ0OkRySkxGMDhDYTR3SUVwUFlHOGl0aUxha3gyU0pZTmdu';
const headerContentType = 'application/x-www-form-urlencoded';
const baseURL: string = 'http://api-krab-dev.bhinneka.com:8080';
const deviceId = Constants.deviceId;

function getUrl(config) {
  if (config.baseURL) {
    return config.url.replace(config.baseURL, '');
  }
  return config.url;
}

// set to true to debug axios
if (Constants.manifest.extra.loggingRedux) {
  // Intercept all requests
  axios.interceptors.request.use(
    config => {
      console.log(
        '%c ' + ' - ' + getUrl(config) + ':',
        'color: #0086b3; font-weight: bold',
        config,
      );
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  // Intercept all responses
  axios.interceptors.response.use(
    response => {
      console.log(
        '%c ' + response.status + ' - ' + getUrl(response.config) + ':',
        'color: #008000; font-weight: bold',
        response,
      );
      return response;
    },

    error => {
      console.log(
        '%c ' + error.response.status + ' - ' + getUrl(error.response.config) + ':',
        'color: #a71d5d; font-weight: bold',
        error.response,
      );
      return Promise.reject(error);
    },
  );
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export enum GrantType {
  ANONYMOUS = 'anonymous',
  PASSWORD = 'password',
  AZURE = 'azure',
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
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
  grantType = GrantType.PASSWORD,
) {
  let requestApi = await axios({
    baseURL,
    method: 'POST',
    url: '/api/v1/auth',
    data: stringify({
      grantType,
      username,
      password,
      deviceId,
    }),
    headers: {
      Authorization: keyAuthorization,
      'Content-Type': headerContentType,
    },
  });
  if (requestApi.status === 200) return requestApi.data;
}

const setUserToken = async (data: Tokens) => {
  await AsyncStorage.multiSet([
    [keyAccessToken, data.accessToken],
    [keyRefreshToken, data.refreshToken],
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
    url: '/api/v1/auth',
    data: stringify({
      grantType: 'refresh_token',
      oldAccessToken,
      refreshToken,
    }),
    headers: {
      Authorization: keyAuthorization,
      'Content-Type': headerContentType,
    },
  });
  if (requestApi.status === 200) return requestApi.data;
}

const removeUserToken = async () => {
  await AsyncStorage.multiRemove([keyAccessToken, keyRefreshToken]);
};

export class ServerError extends Error {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

export class TokenExpired extends Error {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, TokenExpired.prototype);
  }
}

export async function fetchData(
  url: string,
  method: string,
  inputParams = {},
  token: Tokens,
  retry = 0,
) {
  try {
    let requestApi = await axios({
      baseURL,
      method,
      url,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token.accessToken}`,
      },
      params: inputParams,
    });
    if (requestApi.status === 200) {
      return requestApi.data;
    }
  } catch (err) {
    if (err.response.status == 401) {
      if (retry > 1) throw Error('Maximum retry reached');
      let newToken: Tokens = null;
      try {
        newToken = await refreshToken(token.accessToken, token.refreshToken);
      } catch (err) {
        throw new TokenExpired(err);
      }
      await setUserToken(newToken);
      return fetchData(url, method, inputParams, newToken, retry + 1);
    }
    if (err.response.status >= 500 && err.response.status < 600) throw new ServerError(err);
  }
  return undefined;
}

export interface FilterParams {
  categoryId?: string | string[];
  brandId?: string | string[];
  minPriceRange?: string;
  maxPriceRange?: string;
}

/*
TODO:
- include facet parameter boolean flag
- filterParams handles when set to null
- search multiple brands
*/
export async function searchProduct(
  keyword: string,
  pageNumber: number = 1,
  filterParams: FilterParams = {},
  sort?: '' | 'price' | '-price' | 'name' | '-name',
  pageSize = 21,
) {
  let params = {
    include: 'facets',
    'filter[query]': keyword,
    'page[size]': pageSize,
    'page[number]': pageNumber,
  };
  if (filterParams.categoryId) params['filter[categoryId]'] = filterParams.categoryId;
  if (filterParams.brandId instanceof Array)
    params['filter[brandId]'] = filterParams.brandId.join();
  else if (filterParams.brandId) params['filter[brandId]'] = filterParams.brandId;
  if (filterParams.minPriceRange) params['filter[minPrice]'] = filterParams.minPriceRange;
  if (filterParams.maxPriceRange) params['filter[maxPrice]'] = filterParams.maxPriceRange;
  if (sort) params['sort'] = sort;

  let tokens = await getUserToken();
  return fetchData('/api/v1/products/search', 'GET', params, tokens);
}

const MAX_CATEGORY_LEVEL = 4;

function remapCategories(data: any, level = 1) {
  if (level > MAX_CATEGORY_LEVEL) return;
  let childrenkey = 'categoryTree' + (level + 1);
  if (data != null) {
    data = [...data];
    return data.map(category => {
      category['level'] = level;
      category['children'] = category[childrenkey]
        ? remapCategories(category[childrenkey], level + 1)
        : null;
      delete category[childrenkey];
      return category;
    });
  }
  return data;
}

/**
 * Load all category tree
 */
export async function categories(): Promise<Category[]> {
  let res = await searchProduct('', 1, {}, undefined, 1);
  return Category.fromPlain(remapCategories(res.facets.categoryTree1));
}

export async function fetchProduct(sku: string) {
  let tokens = await getUserToken();
  const params = {};
  return await fetchData(`/api/v1/products/${sku}`, 'GET', params, tokens);
}

export async function fetchProductInstallments(sku: string) {
  let tokens = await getUserToken();
  let data = await fetchData('/api/v1/products/installments', 'GET', { sku }, tokens);
  return {
    sku,
    price: data.price,
    installments: plainToClass(Installment, data.installments),
  };
}

async function fetchPlankton({
  url = '/',
  params = undefined,
  method = 'GET',
}: {
  url: string;
  params?: any;
  method?: 'GET' | 'POST';
}) {
  return axios({
    baseURL: 'http://plankton-api-staging.ap-southeast-1.elasticbeanstalk.com',
    method: 'GET',
    url,
    headers: {
      Accept: 'application/vnd.plankton_api.v3+json',
      'x-api-key': '74bfb4277e931989784fe54f04ea3951a8631a60',
    },
    params,
  });
}

export async function fetchProductOffer(offerId: string) {
  let resp = await fetchPlankton({
    url: '/master/offers/' + offerId,
  });
  let offer = plainToClass<Offer, object>(Offer, resp.data.data.attributes);
  offer.id = resp.data.data.id;
  return offer;
}

export async function fetchProductVariant(variantId: string) {
  let resp = await fetchPlankton({
    url: '/master/variants/' + variantId,
  });
  let variant = plainToClass<Variant, object>(Variant, resp.data.data.attributes);
  variant.id = resp.data.data.id;
  variant.stock = plainToClass(Stock, variant.stock);
  // skrg hanya ambil stok dari HO dan store Gunung Sahari
  variant.stock = variant.stock.filter(x => ['HO', 'GSR'].indexOf(x.locationCode) > -1);
  return variant;
}

export async function fetchProductSpecification(sku: string) {
  let tokens = await getUserToken();
  const params = {};
  return await fetchData(`/api/v1/products/specification/${sku}`, 'GET', params, tokens);
}
