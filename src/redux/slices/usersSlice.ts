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
import { RootState } from '../store';
import {
  LOGIN_INITIAL_USER_DATA,
  REGISTRATION_INITIAL_USER_DATA,
} from '../../formsSettings/formsData';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const token = useLocalStorage('token');

export const addNewUser = createAsyncThunk.withTypes<{
  extra: {
    router: Router;
    api: { createUser: (registrationData: IUser) => Promise<IUser> };
  };
}>()(
  'users/addNewUser',
  async (registrationData: IUser, { rejectWithValue, extra }) => {
    try {
      const newUserObj = await extra.api.createUser(registrationData);
      extra.router.navigate('/login');
      return newUserObj;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logInUser = createAsyncThunk.withTypes<{
  extra: {
    router: Router;
    api: { authorizeUser: (config: LoginBasis) => Promise<IUser> };
  };
}>()(
  'users/logInUser',
  async (config: LoginBasis, { rejectWithValue, extra }) => {
    try {
      const userObj = await extra.api.authorizeUser(config);
      extra.router.navigate('/user/info');
      return userObj;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const manageProductInCart = createAsyncThunk.withTypes<{
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
    { getState, rejectWithValue, extra }
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
        return modifiedOrdersHistory;
      }

      if (isSingleProduct(productOrQuantity)) {
        return extra.api.manageProduct(
          { cart: [...actualUser.cart, productOrQuantity] },
          actualUser.id
        );
      }

      if (productOrQuantity.quantity < 1) {
        const modifiedCart = actualUser.cart.filter(
          (_, index) => index !== productOrQuantity.index
        );
        return extra.api.manageProduct({ cart: modifiedCart }, actualUser.id);
      }

      const modifiedCart = actualUser.cart.map((cartItem, index) =>
        index === productOrQuantity.index
          ? { ...cartItem, quantity: productOrQuantity.quantity }
          : cartItem
      );
      return extra.api.manageProduct({ cart: modifiedCart }, actualUser.id);
    } catch (error) {
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
