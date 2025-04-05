//* Redux
import { createAsyncThunk } from '@reduxjs/toolkit';

//* Function
import { getUserInfo } from '../service/opencagedataApi';
import { exchangeCurrency } from '../service/exchangeAPI';
import { latestRates } from '../service/exchangeAPI';

export const setBaseCurrency = createAsyncThunk(
  'baseCurrency/setBaseCurrency',
  async (location, thunkAPI) => {
    const state = thunkAPI.getState();
    const { baseCurrency } = state.currency;

    if (baseCurrency) {
      return thunkAPI.rejectWithValue('We already have base currency!');
    }
    try {
      const data = await getUserInfo(location);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const setExchangeInfo = createAsyncThunk(
  'exchangeInfo/setExchangeInfo',
  async (data, thunkAPI) => {
    try {
      const response = await exchangeCurrency(data);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const setRates = createAsyncThunk(
  'rates/setRates',
  async (baseCurrency, thunkAPI) => {
    try {
      const response = latestRates(baseCurrency);

      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
