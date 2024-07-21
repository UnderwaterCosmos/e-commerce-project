import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';

import { AppDispatch, RootState } from '../store';
import { ISingleProduct, ISingleProductState } from '../../types/products';
import {
  IProductEditedValueBasis,
  IAddNewProductImagesBasis,
} from '../../types/forms';
import {
  EDIT_PRODUCT_INITIAL_DATA,
  ADD_PRODUCT_IMAGES_OBJ,
} from '../../formsSettings/formsData';
import { setNotification } from './notificationSlice';

export const fetchSingleProduct = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
  extra: {
    api: { getSingleProduct: (id: string) => Promise<ISingleProduct> };
  };
}>()(
  'singleProduct/fetchSingleProduct',
  async (id: string, { dispatch, rejectWithValue, extra }) => {
    try {
      return extra.api.getSingleProduct(id);
    } catch (error) {
      dispatch(
        setNotification({
          type: 'error',
          message: 'Ошибка при загрузке товара!',
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const editSingleProduct = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
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
    { dispatch, getState, rejectWithValue, extra }
  ) => {
    try {
      const productId = getState().singleProductData.singleProduct?.id;
      const editedProduct = await extra.api.editProduct(editedData, productId);
      dispatch(
        setNotification({
          type: 'success',
          message: 'Товар успешно отредактирован!',
        })
      );
      return editedProduct;
    } catch (error) {
      dispatch(
        setNotification({
          type: 'error',
          message: 'Ошибка при редактировании товара!',
        })
      );
      return rejectWithValue(error);
    }
  }
);

const initialState: ISingleProductState = {
  isLoading: false,
  singleProduct: null,
  editProductBasis: EDIT_PRODUCT_INITIAL_DATA,
  newImagesObj: ADD_PRODUCT_IMAGES_OBJ,
  isBackBtnPressed: false,
};

const singleProductSlice = createSlice({
  name: '@singleProduct',
  initialState,
  reducers: {
    setBackBtnStatus: (state, action: PayloadAction<boolean>) => {
      state.isBackBtnPressed = action.payload;
    },
    setEditProductBasis: (
      state,
      action: PayloadAction<IProductEditedValueBasis>
    ) => {
      state.editProductBasis = action.payload;
    },
    setNewImagesBasis: (
      state,
      action: PayloadAction<IAddNewProductImagesBasis>
    ) => {
      state.newImagesObj = action.payload;
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

export const { setBackBtnStatus, setEditProductBasis, setNewImagesBasis } =
  singleProductSlice.actions;
export const singleProductReducer = singleProductSlice.reducer;
