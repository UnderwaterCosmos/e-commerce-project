import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  IFiltersState,
  IFiltersData,
  ICategoriesElem,
} from '../../types/filters';
import { ADD_CATEGORY_INITIAL_DATA } from '../../formsSettings/formsData';

export const fetchCategories = createAsyncThunk.withTypes<{
  extra: {
    api: { getCategories: () => Promise<ICategoriesElem[]> };
  };
}>()(
  'filters/fetchCategories',
  async (isBackBtnPressed: boolean, { rejectWithValue, extra }) => {
    try {
      return extra.api.getCategories();
    } catch (error) {
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
  extra: {
    api: {
      createCategory: (
        categoryData: ICategoriesElem
      ) => Promise<ICategoriesElem>;
    };
  };
}>()(
  'filters/addNewCategory',
  async (categoryData: ICategoriesElem, { rejectWithValue, extra }) => {
    try {
      return extra.api.createCategory(categoryData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: IFiltersState = {
  isLoading: false,
  newCategoryBasis: ADD_CATEGORY_INITIAL_DATA,
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

export const { setFiltersValue, setCategoryBasis } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
