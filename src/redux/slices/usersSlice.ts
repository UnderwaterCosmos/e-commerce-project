import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser, IUserState, IUserBasis } from '../../types/users';
import { REGISTRATION_INITIAL_USER_DATA } from '../../formsData';

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

const initialState: IUserState = {
  isLoading: false,
  usersList: [],
  userBasis: REGISTRATION_INITIAL_USER_DATA,
};

const usersSlice = createSlice({
  name: '@users',
  initialState,
  reducers: {
    setUserBasis: (state, action: PayloadAction<IUserBasis>) => {
      state.userBasis = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.usersList.push(action.payload);
        state.isLoading = false;
      });
  },
});

export const { setUserBasis } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
