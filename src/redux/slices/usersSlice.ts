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
import {
  LOGIN_INITIAL_USER_DATA,
  REGISTRATION_INITIAL_USER_DATA,
} from '../../formsData';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const { setItem } = useLocalStorage('token');

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
    authorizeUser: (config: LoginBasis) => Promise<LoginBasis>;
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

const initialState: IUserState = {
  isLoading: false,
  usersList: [],
  authUser: null,
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
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.usersList.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addAuthorizedUser.fulfilled, (state, action) => {
        state.authUser = action.payload;
        setItem(Math.ceil(Math.random() * 100000000));
        state.isLoading = false;
      })
      .addCase(removeAuthorizedUser.fulfilled, (state) => {
        state.authUser = null;
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          addNewUser.pending,
          addAuthorizedUser.pending,
          removeAuthorizedUser.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          addNewUser.rejected,
          addAuthorizedUser.rejected,
          removeAuthorizedUser.rejected
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
