import { AsyncStorage } from 'react-native';
import { fetchData } from '../../helpers/fetch-data';
import ActionTypes from '../../store/action-types';

export const fetchSearch = (keyword: string) => dispatch => {
  const url = `api/products/search?filter[query]=${keyword}&page[size]=21&page[number]=1`;
  return fetchData(url, 'GET').then(data => {
    const hits = data.hits === undefined ? [] : data.hits;
    dispatch(productsData(hits));
  });
};

export const productsData = data => ({
  type: ActionTypes.PRODUCTS_DATA_LIST,
  products: data
});

export default {
  fetchSearch
};
