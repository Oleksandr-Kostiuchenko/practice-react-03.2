import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data/',
  headers: { apikey: 'JYT3bs3vLExP706CCGaCdpcP8yZm6SV8' },
});

export const exchangeCurrency = async credentials => {
  const {
    data: { query, info, result },
  } = await instance.get(`/convert`, {
    params: credentials,
  });
  return { ...query, rate: info.rate, result };
};

// export const latestRates = async baseCurrency => {
//   const { data } = await instance.get(`/latest?symbols&base=${baseCurrency}`);
//   return Object.entries(data.rates);
// };

export const latestRates = async baseCurrency => {
  const { data } = await instance.get(`/latest`, {
    params: { base: baseCurrency },
  });
  return Object.entries(data.rates);
};
