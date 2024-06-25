import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './slices/productsSlice';
import { filtersReducer } from './slices/filtersSlice';
import { singleProductReducer } from './slices/singleProductSlice';
import { usersReducer } from './slices/usersSlice';
import * as api from './api';

export const store = configureStore({
  reducer: {
    productsData: productsReducer,
    filtersData: filtersReducer,
    singleProductData: singleProductReducer,
    usersData: usersReducer,
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
