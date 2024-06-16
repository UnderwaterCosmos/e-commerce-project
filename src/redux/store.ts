import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './slices/productsSlice';
import * as api from './api';

export const store = configureStore({
  reducer: {
    productsList: productsReducer,
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
