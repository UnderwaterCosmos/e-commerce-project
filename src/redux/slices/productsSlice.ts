import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ISingleProduct } from '../../types/products';

export const fetchProducts = createAsyncThunk.withTypes<{
  extra: { getProducts: () => Promise<ISingleProduct[]> };
}>()(
  'products/fetchProducts',
  async (_: undefined, { rejectWithValue, extra: api }) => {
    try {
      return await api.getProducts();
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);

const initialState: ISingleProduct[] = [];

const productSlice = createSlice({
  name: '@products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (_, action) => action.payload);
  },
});

export const productsReducer = productSlice.reducer;
