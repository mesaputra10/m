import axios from 'axios';

export const fetchData = (url: string, method: string, params: object, callback: any) => {
  return axios({
    baseURL: 'https://ea927e5a-997a-45c3-a480-758d829f28be.mock.pstmn.io',
    method,
    url,
    params,
  })
  .then((response) => {
    console.log('Response: ', response);
    callback(response.data);
  })
  .catch((thrown) => {
    if (axios.isCancel(thrown)) {
      console.log('Request canceled: ', thrown.message);
    } else {
      console.log('Request error: ', thrown.message);
    }
  });
};

export default fetchData;