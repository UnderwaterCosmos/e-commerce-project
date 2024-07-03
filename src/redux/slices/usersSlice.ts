import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import type { Router } from '@remix-run/router';

import { IUser, IUserState } from '../../types/users';
import {
  RegistrationBasis,
  LoginBasis,
  // IFormBasis
} from '../../types/forms';
import { ISingleProduct } from '../../types/products';
import { RootState } from '../store';
import {
  LOGIN_INITIAL_USER_DATA,
  REGISTRATION_INITIAL_USER_DATA,
} from '../../formsData';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const token = useLocalStorage('token');

export const addNewUser = createAsyncThunk.withTypes<{
  extra: {
    api: { createUser: (registrationData: IUser) => Promise<IUser> };
  };
}>()(
  'users/addNewUser',
  async (registrationData: IUser, { rejectWithValue, extra }) => {
    try {
      return extra.api.createUser(registrationData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logInUser = createAsyncThunk.withTypes<{
  extra: {
    api: { authorizeUser: (config: LoginBasis) => Promise<IUser> };
    router: Router;
  };
}>()(
  'users/logInUser',
  async (config: LoginBasis, { rejectWithValue, extra }) => {
    try {
      const userObj = await extra.api.authorizeUser(config);
      extra.router.navigate('/user');
      return userObj;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addProductToCart = createAsyncThunk.withTypes<{
  state: RootState;
  extra: {
    api: {
      addToCart: (
        userId?: number,
        value?: { cart: ISingleProduct[] }
      ) => Promise<IUser>;
    };
  };
}>()(
  'users/addProductToCart',
  async (
    product: ISingleProduct,
    { getState, rejectWithValue, extra }
  ) => {
    try {
      const actualUser = getState().usersData.fullUserInfo;
      return extra.api.addToCart(actualUser?.id, {
        cart: [...(actualUser?.cart as ISingleProduct[]), product],
      });
    } catch (error) {
      return rejectWithValue(error);
    }
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
    // setFormBasis: (state, action: PayloadAction<IFormBasis>) => {
    //   state[action.payload.key] = action.payload.value;
    // },
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
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.fullUserInfo = action.payload;
      })
      .addMatcher(
        isAnyOf(
          addNewUser.pending,
          logInUser.pending,
          addProductToCart.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          logInUser.rejected,
          logInUser.fulfilled,
          addProductToCart.rejected,
          addProductToCart.fulfilled,
          addNewUser.rejected,
          addNewUser.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      );
    // .addMatcher(
    //   (action) => action.type.endsWith('/pending'),
    //   (state) => {
    //     state.isLoading = true;
    //   }
    // )
    // .addMatcher(
    //   (action) => action.type.endsWith('/rejected'),
    //   (state) => {
    //     state.isLoading = false;
    //   }
    // );
  },
});

export const {
  setRegistrationBasis,
  setLoginBasis,
  resetFullUserInfo,
  // setFormBasis
} = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
