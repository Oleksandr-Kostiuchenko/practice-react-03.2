//* Redux
import { createSlice } from '@reduxjs/toolkit';
import { setBaseCurrency } from './operations';
import { setExchangeInfo } from './operations';
import { setRates } from './operations';

//* Slice
const slice = createSlice({
  name: 'currencySlice',
  initialState: {
    baseCurrency: '',
    exchangeInfo: null,
    rates: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setDefaultCurrency: (state, action) => {
      state.baseCurrency = 'USD';
    },
  },
  extraReducers: builder => {
    // Base currency
    builder.addCase(setBaseCurrency.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(setBaseCurrency.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.baseCurrency = action.payload;
    });
    builder.addCase(setBaseCurrency.rejected, async (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Exchange Info
    builder.addCase(setExchangeInfo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(setExchangeInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.exchangeInfo = action.payload;
    });
    builder.addCase(setExchangeInfo.rejected, async (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Rates
    builder.addCase(setRates.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(setRates.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.rates = action.payload;
    });
    builder.addCase(setRates.rejected, async (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { setDefaultCurrency } = slice.actions;
export default slice.reducer;

//* Selector
export const selectBaseCurrency = state => state.currency.baseCurrency;
export const selectExchangeData = state => state.currency.exchangeInfo;

export const selectError = state => state.currency.error;
export const selectIsLoading = state => state.currency.isLoading;
