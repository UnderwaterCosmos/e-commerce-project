import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ISingleProduct } from '../../types/products';

interface ISingleProductState {
  singleProduct: ISingleProduct | null;
  isLoading: boolean;
}

export const fetchSingleProduct = createAsyncThunk.withTypes<{
  extra: {
    getSingleProduct: (id: string) => Promise<ISingleProduct>;
  };
}>()(
  'singleProduct/fetchSingleProduct',
  async (id: string, { rejectWithValue, extra: api }) => {
    try {
      return await api.getSingleProduct(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: ISingleProductState = {
  isLoading: false,
  singleProduct: null,
};

const singleProductSlice = createSlice({
  name: '@singleProduct',
  initialState,
  reducers: {},
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

export const singleProductReducer = singleProductSlice.reducer;
