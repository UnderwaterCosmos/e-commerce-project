import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ISingleProduct, IGetProductsConfig } from '../../types/products';

interface IProductsState {
  isLoading: boolean;
  productsList: ISingleProduct[];
  totalPages: number;
}
interface IFetchResponse {
  data: ISingleProduct[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
}

export const fetchProducts = createAsyncThunk.withTypes<{
  extra: {
    getProducts: (config: IGetProductsConfig) => Promise<IFetchResponse>;
  };
}>()(
  'products/fetchProducts',
  async (config: IGetProductsConfig, { rejectWithValue, extra: api }) => {
    try {
      const data = await api.getProducts(config);
      return {
        data: data.data,
        totalPages: data.pages,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: IProductsState = {
  isLoading: false,
  productsList: [],
  totalPages: 0,
};

const productSlice = createSlice({
  name: '@products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.isLoading = true;
        if (action.meta.arg.replace) {
          state.productsList = [];
        }
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (action.meta.arg.replace) {
          state.productsList = action.payload.data;
        } else {
          state.productsList = state.productsList.concat(action.payload.data);
        }
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
      });
  },
});

export const productsReducer = productSlice.reducer;
