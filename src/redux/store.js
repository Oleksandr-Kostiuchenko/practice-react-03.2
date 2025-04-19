//* Redux
import { configureStore } from '@reduxjs/toolkit';
import currencySliceReducer from './currencySlice';
import filterSliceReducer from './filterSlice';

//* Persistor
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistedCurrencyReducer = persistReducer(
  {
    key: 'baseCurrency',
    storage,
    whitelist: ['baseCurrency'],
  },
  currencySliceReducer,
);

export const store = configureStore({
  reducer: {
    currency: persistedCurrencyReducer,
    filter: filterSliceReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistedStore = persistStore(store);
