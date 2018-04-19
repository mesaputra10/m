import axios from 'axios';

export const fetchData = (url: string, method: string, params: object, callback: any) => {
  const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI0OWZlNzc1NC1mODJlLTQ5MDctOTIyOC03YzI2YTVjZDYyNDQiLCJhdXRob3Jpc2VkIjp0cnVlLCJkZXZpY2VJZCI6ImJoaW5uZWthLWJhYmI1YjYxLTc3NWEtNGYxZS05Yjc1LTExYjFhNTI4ZDJmOSIsImV4cCI6MTUyNDEzOTM4MywiaWF0IjoxNTI0MTM4MTgzLCJpc3MiOiJiaGlubmVrYS5jb20iLCJzdWIiOiJVU1IxNjEwMDAwMDMifQ.c82ULRALpEoW0roIq0zp_U6B5u9-QWHEnmiO2-wDcYfikE3ZFhnNAiQVkHXd_57ofjmj_hTOzpclO_mTYhGJ4Zx2RZRM-TdhDaPMr6aGh_XDtDCL08uux8hhohB2h-rEew4sfiQsRHpZ_GWf3xcUovX82t9Ji2Hsql8wylwSHRRp0fYNvzY4LlmpOkSwdug_0RTy9tY_iZy8nwtWUBEe5JcbforCRS59RbRgkuA4jW1ot-VD7OalHjsHVjWwnFy-AiDau3vkyfqNt_hTxE0DkxbHQGEo6wULH3HPk6WZFebDKsLo7KMq0J03wL6UnN7EhUgVPtGCjZLvS4Uvds1aYQ';
  return axios({
    baseURL: 'https://b2c-api-staging.bhinneka.com',
    method,
    url,
    params,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
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