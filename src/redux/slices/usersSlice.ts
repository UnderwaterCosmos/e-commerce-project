import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';

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

export const addNewUser = createAsyncThunk.withTypes<{
  extra: {
    createUser: (registrationData: IUser) => Promise<IUser>;
  };
}>()(
  'users/addNewUser',
  async (registrationData: IUser, { rejectWithValue, extra: api }) => {
    try {
      return api.createUser(registrationData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addAuthorizedUser = createAsyncThunk.withTypes<{
  extra: {
    authorizeUser: (config: LoginBasis) => Promise<{
      loginData: LoginBasis;
      fullUserData: IUser | null;
    }>;
  };
}>()(
  'users/addAuthorizedUser',
  async (config: LoginBasis, { rejectWithValue, extra: api }) => {
    try {
      return api.authorizeUser(config);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeAuthorizedUser = createAsyncThunk.withTypes<{
  extra: {
    removeUser: (id: number) => Promise<number>;
  };
}>()(
  'users/removeAuthorizedUser',
  async (id: number, { rejectWithValue, extra: api }) => {
    try {
      return api.removeUser(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addProductToCart = createAsyncThunk.withTypes<{
  state: RootState;
  extra: {
    addToCart: (
      userId: number | undefined,
      value: { cart: ISingleProduct[] }
    ) => Promise<IUser>;
  };
}>()(
  'users/addProductToCart',
  async (
    product: ISingleProduct,
    { getState, rejectWithValue, extra: api }
  ) => {
    try {
      const actualUser = getState().usersData.fullUserInfo;
      return api.addToCart(actualUser?.id, {
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
  authUserInfo: null,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAuthorizedUser.fulfilled, (state, action) => {
        state.authUserInfo = action.payload.loginData;
        state.fullUserInfo = action.payload.fullUserData;
      })
      .addCase(removeAuthorizedUser.fulfilled, (state) => {
        state.authUserInfo = null;
        state.fullUserInfo = null;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.fullUserInfo = action.payload;
      })
      .addMatcher(
        isAnyOf(
          addNewUser.pending,
          addAuthorizedUser.pending,
          removeAuthorizedUser.pending,
          addProductToCart.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          addAuthorizedUser.rejected,
          addAuthorizedUser.fulfilled,
          removeAuthorizedUser.rejected,
          removeAuthorizedUser.fulfilled,
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
  // setFormBasis
} = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
