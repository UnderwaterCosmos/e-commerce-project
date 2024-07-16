import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  IFiltersState,
  IFiltersData,
  ICategoriesElem,
} from '../../types/filters';
import {
  ADD_CATEGORY_INITIAL_DATA,
  ADD_PRODUCT_IMAGES_OBJ,
} from '../../formsSettings/formsData';
import { IAddNewProductImagesBasis } from '../../types/forms';
import { AppDispatch } from '../store';
import { setNotification } from './notificationSlice';

export const fetchCategories = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
  extra: {
    api: { getCategories: () => Promise<ICategoriesElem[]> };
  };
}>()(
  'filters/fetchCategories',
  async (isBackBtnPressed: boolean, { dispatch, rejectWithValue, extra }) => {
    try {
      return extra.api.getCategories();
    } catch (error) {
      dispatch(
        setNotification({
          type: 'error',
          message: 'Ошибка при загрузке категорий!',
        })
      );
      return rejectWithValue(error);
    }
  },
  {
    condition: (isBackBtnPressed) => {
      if (isBackBtnPressed) return false;
    },
  }
);

export const addNewCategory = createAsyncThunk.withTypes<{
  dispatch: AppDispatch;
  extra: {
    api: {
      createCategory: (
        categoryData: ICategoriesElem
      ) => Promise<ICategoriesElem>;
    };
  };
}>()(
  'filters/addNewCategory',
  async (
    categoryData: ICategoriesElem,
    { dispatch, rejectWithValue, extra }
  ) => {
    try {
      const newCategory = await extra.api.createCategory(categoryData);
      dispatch(
        setNotification({
          type: 'success',
          message: 'Категория успешно добавлена!',
        })
      );
      return newCategory;
    } catch (error) {
      dispatch(
        setNotification({
          type: 'error',
          message: 'Ошибка при добавлении новой категории!',
        })
      );
      return rejectWithValue(error);
    }
  }
);

const initialState: IFiltersState = {
  isLoading: false,
  newCategoryBasis: ADD_CATEGORY_INITIAL_DATA,
  newImagesObj: ADD_PRODUCT_IMAGES_OBJ,
  categoriesList: [],
  select: '',
  search: '',
};

const filtersSlice = createSlice({
  name: '@filters',
  initialState,
  reducers: {
    setFiltersValue: (state, action: PayloadAction<IFiltersData>) => {
      state[action.payload.key] = action.payload.value;
    },
    setCategoryBasis: (state, action: PayloadAction<ICategoriesElem>) => {
      state.newCategoryBasis = action.payload;
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
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesList = action.payload;
      })
      .addCase(addNewCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewCategory.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.categoriesList.push(action.payload);
        state.isLoading = false;
      });
  },
});

export const { setFiltersValue, setCategoryBasis, setNewImagesBasis } =
  filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
