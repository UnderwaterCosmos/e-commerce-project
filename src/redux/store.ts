import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
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
import { combineReducers } from 'redux';

import { productsReducer } from './slices/productsSlice';
import { filtersReducer } from './slices/filtersSlice';
import { singleProductReducer } from './slices/singleProductSlice';
import { usersReducer } from './slices/usersSlice';
import { notificationReducer } from './slices/notificationSlice';
import { mobileMenuReducer } from './slices/mobileMenuSlice';
import { router } from '../router';
import * as api from './api';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};
const usersDataPersistConfig = {
  key: 'usersData',
  storage,
  whitelist: ['fullUserInfo'],
};
const rootReducer = combineReducers({
  productsData: productsReducer,
  filtersData: filtersReducer,
  singleProductData: singleProductReducer,
  usersData: persistReducer(usersDataPersistConfig, usersReducer),
  notificationData: notificationReducer,
  mobileMenuData: mobileMenuReducer,
});
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      thunk: {
        extraArgument: {
          api,
          router,
        },
      },
    }),
});

export const selectProductsData = (state: RootState) => state.productsData;
export const selectFiltersData = (state: RootState) => state.filtersData;
export const selectSingleProductsData = (state: RootState) =>
  state.singleProductData;
export const selectUsersData = (state: RootState) => state.usersData;
export const selectNotificationData = (state: RootState) =>
  state.notificationData;
export const selectMobileMenuData = (state: RootState) => state.mobileMenuData;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
