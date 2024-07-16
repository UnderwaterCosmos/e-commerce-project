import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import type { Router } from '@remix-run/router';

import { IUser, IUserState } from '../../types/users';
import { RegistrationBasis, LoginBasis } from '../../types/forms';
import {
  ISingleProduct,
  isSingleProduct,
  isSingleProductArray,
} from '../../types/products';
import { AppDispatch, RootState } from '../store';
import {
  LOGIN_INITIAL_USER_DATA,
  REGISTRATION_INITIAL_USER_DATA,
} from '../../formsSettings/formsData';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { setNotification } from './notificationSlice';

const token = useLocalStorage('token');

export const addNewUser = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
  extra: {
    router: Router;
    api: { createUser: (registrationData: IUser) => Promise<IUser> };
  };
}>()(
  'users/addNewUser',
  async (registrationData: IUser, { dispatch, rejectWithValue, extra }) => {
    try {
      const newUserObj = await extra.api.createUser(registrationData);
      extra.router.navigate('/login');
      dispatch(
        setNotification({
          type: 'success',
          message: 'Вы успешно зарегистрировались!',
        })
      );
      return newUserObj;
    } catch (error) {
      dispatch(
        setNotification({ type: 'error', message: 'Ошибка при регистрации!' })
      );
      return rejectWithValue(error);
    }
  }
);

export const logInUser = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
  extra: {
    router: Router;
    api: { authorizeUser: (config: LoginBasis) => Promise<IUser> };
  };
}>()(
  'users/logInUser',
  async (config: LoginBasis, { dispatch, rejectWithValue, extra }) => {
    try {
      const userObj = await extra.api.authorizeUser(config);
      extra.router.navigate('/user/info');
      dispatch(
        setNotification({
          type: 'success',
          message: 'Вы успешно вошли в профиль!',
        })
      );
      return userObj;
    } catch (error) {
      dispatch(
        setNotification({
          type: 'error',
          message: 'Ошибка при входе в профиль!',
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const manageProductInCart = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
  state: RootState;
  extra: {
    router: Router;
    api: {
      manageProduct: (
        value:
          | { cart: ISingleProduct[] }
          | { ordersHistory: { [key: string]: ISingleProduct[] }; cart: [] },
        userId?: number
      ) => Promise<IUser>;
    };
  };
}>()(
  'users/manageProductInCart',
  async (
    productOrQuantity:
      | ISingleProduct
      | { index: number; quantity: number }
      | ISingleProduct[],
    { dispatch, getState, rejectWithValue, extra }
  ) => {
    try {
      const actualUser = getState().usersData.fullUserInfo!;

      if (isSingleProductArray(productOrQuantity)) {
        const orderDate = String(new Date());
        const modifiedOrdersHistory = await extra.api.manageProduct(
          {
            ordersHistory: {
              ...actualUser.ordersHistory,
              [orderDate]: productOrQuantity,
            },
            cart: [],
          },
          actualUser.id
        );
        await extra.router.navigate('/products');
        dispatch(
          setNotification({
            type: 'success',
            message: 'Заказ успешно оформлен!',
          })
        );
        return modifiedOrdersHistory;
      }

      if (isSingleProduct(productOrQuantity)) {
        const modifiedCart = await extra.api.manageProduct(
          { cart: [...actualUser.cart, productOrQuantity] },
          actualUser.id
        );
        dispatch(
          setNotification({
            type: 'success',
            message: 'Товар добавлен в корзину!',
          })
        );
        return modifiedCart;
      }

      if (productOrQuantity.quantity < 1) {
        const modifiedCart = actualUser.cart.filter(
          (_, index) => index !== productOrQuantity.index
        );
        const cartWithoutProduct = await extra.api.manageProduct(
          { cart: modifiedCart },
          actualUser.id
        );
        dispatch(
          setNotification({
            type: 'success',
            message: 'Товар удален из корзины!',
          })
        );
        return cartWithoutProduct;
      }

      const modifiedCart = actualUser.cart.map((cartItem, index) =>
        index === productOrQuantity.index
          ? { ...cartItem, quantity: productOrQuantity.quantity }
          : cartItem
      );
      const cartWithProduct = await extra.api.manageProduct(
        { cart: modifiedCart },
        actualUser.id
      );
      dispatch(
        setNotification({
          type: 'success',
          message: 'Товар добавлен в корзину!',
        })
      );
      return cartWithProduct;
    } catch (error) {
      dispatch(
        setNotification({
          type: 'error',
          message: 'Ошибка при работе с товаром!',
        })
      );
      return rejectWithValue(error);
    }
  },
  {
    condition: (productOrQuantity, { getState }) => {
      const isLoading = getState().usersData.isLoading;
      if (isLoading) return false;
    },
  }
);

const initialState: IUserState = {
  isLoading: false,
  fullUserInfo: null,
  registrationBasis: REGISTRATION_INITIAL_USER_DATA,
  loginBasis: LOGIN_INITIAL_USER_DATA,
};

const usersSlice = createSlice({
  name: '@users',
  initialState,
  reducers: {
    setRegistrationBasis: (state, action: PayloadAction<RegistrationBasis>) => {
      state.registrationBasis = action.payload;
    },
    setLoginBasis: (state, action: PayloadAction<LoginBasis>) => {
      state.loginBasis = action.payload;
    },
    resetFullUserInfo: (state) => {
      state.fullUserInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInUser.fulfilled, (state, action) => {
        token.setItem(Math.ceil(Math.random() * 100000000));
        state.fullUserInfo = action.payload;
      })
      .addCase(manageProductInCart.fulfilled, (state, action) => {
        state.fullUserInfo = action.payload;
      })
      .addMatcher(
        isAnyOf(
          addNewUser.pending,
          logInUser.pending,
          manageProductInCart.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          logInUser.rejected,
          logInUser.fulfilled,
          manageProductInCart.rejected,
          manageProductInCart.fulfilled,
          addNewUser.rejected,
          addNewUser.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const { setRegistrationBasis, setLoginBasis, resetFullUserInfo } =
  usersSlice.actions;
export const usersReducer = usersSlice.reducer;
