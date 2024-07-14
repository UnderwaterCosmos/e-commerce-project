import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { ISingleProduct, ISingleProductState } from '../../types/products';
import { IProductEditedValueBasis } from '../../types/forms';
import { EDIT_PRODUCT_INITIAL_DATA } from '../../formsSettings/formsData';

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

export const editSingleProduct = createAsyncThunk.withTypes<{
  state: RootState;
  extra: {
    api: {
      editProduct: (
        editedData: IProductEditedValueBasis,
        productId?: number
      ) => Promise<ISingleProduct>;
    };
  };
}>()(
  'singleProduct/editSingleProduct',
  async (
    editedData: IProductEditedValueBasis,
    { getState, rejectWithValue, extra }
  ) => {
    try {
      const productId = getState().singleProductData.singleProduct?.id;
      return extra.api.editProduct(editedData, productId);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: ISingleProductState = {
  isLoading: false,
  singleProduct: null,
  editProductBasis: EDIT_PRODUCT_INITIAL_DATA,
  isBackBtnPressed: false,
};

const singleProductSlice = createSlice({
  name: '@singleProduct',
  initialState,
  reducers: {
    setBackBtnStatus: (state, action) => {
      state.isBackBtnPressed = action.payload;
    },
    setEditProductBasis: (state, action) => {
      state.editProductBasis = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(fetchSingleProduct.pending, editSingleProduct.pending),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(fetchSingleProduct.rejected, editSingleProduct.rejected),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(fetchSingleProduct.fulfilled, editSingleProduct.fulfilled),
        (state, action) => {
          state.singleProduct = action.payload;
          state.isLoading = false;
        }
      );
  },
});

export const { setBackBtnStatus, setEditProductBasis } =
  singleProductSlice.actions;
export const singleProductReducer = singleProductSlice.reducer;
