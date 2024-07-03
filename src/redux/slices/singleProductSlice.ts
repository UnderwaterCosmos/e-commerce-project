import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ISingleProduct, ISingleProductState } from '../../types/products';

export const fetchSingleProduct = createAsyncThunk.withTypes<{
  extra: {
    api: { getSingleProduct: (id: string) => Promise<ISingleProduct> };
  };
}>()(
  'singleProduct/fetchSingleProduct',
  async (id: string, { rejectWithValue, extra }) => {
    try {
      return extra.api.getSingleProduct(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: ISingleProductState = {
  isLoading: false,
  singleProduct: null,
  isBackBtnPressed: false,
};

const singleProductSlice = createSlice({
  name: '@singleProduct',
  initialState,
  reducers: {
    setBackBtnStatus: (state, action) => {
      state.isBackBtnPressed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleProduct.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProduct = action.payload;
        state.isLoading = false;
      });
  },
});

export const { setBackBtnStatus } = singleProductSlice.actions;
export const singleProductReducer = singleProductSlice.reducer;
