import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isAnyOf,
} from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import {
  IGetProductsConfig,
  IProductsState,
  ISingleProduct,
} from '../../types/products';
import { ADD_PRODUCT_INITIAL_DATA } from '../../formsSettings/formsData';
import { AppDispatch } from '../store';
import { setNotification } from './notificationSlice';

export const fetchProducts = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
  extra: {
    api: {
      getProducts: (config: IGetProductsConfig) => Promise<AxiosResponse>;
    };
  };
}>()(
  'products/fetchProducts',
  async (config: IGetProductsConfig, { dispatch, rejectWithValue, extra }) => {
    try {
      const { data, headers } = await extra.api.getProducts(config);
      return {
        data: data,
        totalPages: Math.ceil(headers['x-total-count'] / 10),
      };
    } catch (error) {
      dispatch(
        setNotification({
          type: 'error',
          message: 'Ошибка при загрузке товаров!',
        })
      );
      return rejectWithValue(error);
    }
  },
  {
    condition: (config) => {
      if (config.preventRequest) return false;
    },
  }
);

export const addNewProduct = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
  extra: {
    api: {
      createProduct: (productData: ISingleProduct) => Promise<ISingleProduct>;
    };
  };
}>()(
  'products/addNewProduct',
  async (productData: ISingleProduct, { dispatch, rejectWithValue, extra }) => {
    try {
      const newProduct = await extra.api.createProduct(productData);
      dispatch(
        setNotification({
          type: 'success',
          message: 'Товар успешно добавлен!',
        })
      );
      return newProduct;
    } catch (error) {
      dispatch(
        setNotification({
          type: 'error',
          message: 'Ошибка при добавлении нового товара!',
        })
      );
      return rejectWithValue(error);
    }
  }
);

const initialState: IProductsState = {
  isLoading: false,
  newProductBasis: ADD_PRODUCT_INITIAL_DATA,
  productsList: [],
  totalPages: 0,
};

const productSlice = createSlice({
  name: '@products',
  initialState,
  reducers: {
    setProductsBasis: (state, action: PayloadAction<ISingleProduct>) => {
      state.newProductBasis = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.isLoading = true;
        if (action.meta.arg.replace) {
          state.productsList = [];
        }
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (action.meta.arg.replace) {
          state.productsList = action.payload.data;
        } else {
          state.productsList = state.productsList.concat(action.payload.data);
        }
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
      })
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.productsList.push(action.payload);
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(fetchProducts.rejected, addNewProduct.rejected),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const { setProductsBasis } = productSlice.actions;
export const productsReducer = productSlice.reducer;
