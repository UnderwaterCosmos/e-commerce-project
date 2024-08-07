import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFiltersState, ISelect, ICategoriesElem } from '../../types/filters';
import { ADD_CATEGORY_INITIAL_DATA } from '../../formsSettings/formsData';
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
  categoriesList: [],
  select: {
    value: '',
    label: 'Все товары',
  },
  search: '',
};

const filtersSlice = createSlice({
  name: '@filters',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSelectValue: (state, action: PayloadAction<ISelect>) => {
      state.select = action.payload;
    },
    setCategoryBasis: (state, action: PayloadAction<ICategoriesElem>) => {
      state.newCategoryBasis = action.payload;
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

export const { setSearchValue, setSelectValue, setCategoryBasis } =
  filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
