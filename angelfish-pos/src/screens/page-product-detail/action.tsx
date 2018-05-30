import { fetchProduct } from '../../helpers/fetch-data';
export const fetchDataProduct = async sku => {
  return fetchProduct(sku);
};
