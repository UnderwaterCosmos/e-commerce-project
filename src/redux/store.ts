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
import * as api from './api';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};
const usersDataPersistConfig = {
  key: 'usersData',
  storage,
  whitelist: ['fullUserInfo', 'authUserInfo'],
};
const rootReducer = combineReducers({
  productsData: productsReducer,
  filtersData: filtersReducer,
  singleProductData: singleProductReducer,
  usersData: persistReducer(usersDataPersistConfig, usersReducer),
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
        extraArgument: api,
      },
    }),
});

export const persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
