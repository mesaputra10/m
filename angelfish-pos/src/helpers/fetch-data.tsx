import axios from 'axios';

export const fetchData = (url: string, method: string, params: object, callback: any) => {
  const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiI0OWZlNzc1NC1mODJlLTQ5MDctOTIyOC03YzI2YTVjZDYyNDQiLCJhdXRob3Jpc2VkIjp0cnVlLCJkZXZpY2VJZCI6ImJoaW5uZWthLWJhYmI1YjYxLTc3NWEtNGYxZS05Yjc1LTExYjFhNTI4ZDJmOSIsImV4cCI6MTUyNDE5ODgyMCwiaWF0IjoxNTI0MTk3NjIwLCJpc3MiOiJiaGlubmVrYS5jb20iLCJzdWIiOiJVU1IxNjEwMDAwMDMifQ.SMNBDryfr7wyZrtC_ByxzdrcF6gwEZjtqMgMZw9Z6x5pt388d0iecGStxodbKTcJ9lSp8eqdUJlKy54aCDbVcLCBQT-704W3AVZqrXbN3PgejEFjCnBXZw8Y5uGR2nBFhYZTksqiLUP4K5GIlj0qEfQp_V7RtoQ9HYM_Oqw_ngq36fKuqs2L3uVhOtkLCSOMoWcIvpU-UXM0JACWKmgZb6rHp3w0McYWbNGNKXrXQA-bwTXHdb8RSmWojkIQVnj0K2_4nuRQJYxQZ8D5up44IbhNG3ZVzExgH7twjJ71kUZcfQ_VxKZ80YNBDtzlKwYMd69sm40Az0U5gPftgsgCHg';
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