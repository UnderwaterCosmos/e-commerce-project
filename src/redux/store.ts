import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './slices/productsSlice';
import { filtersReducer } from './slices/filtersSlice';
import * as api from './api';

export const store = configureStore({
  reducer: {
    productsList: productsReducer,
    filtersData: filtersReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
