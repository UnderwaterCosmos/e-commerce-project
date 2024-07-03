import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IFiltersState,
  IFiltersData,
  ICategoriesElem,
} from '../../types/filters';

export const fetchCategories = createAsyncThunk.withTypes<{
  extra: {
    api: { getCategories: () => Promise<ICategoriesElem[]> };
  };
}>()(
  'filters/fetchCategories',
  async (isBackBtnPressed: boolean, { rejectWithValue, extra }) => {
    try {
      return await extra.api.getCategories();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
  {
    condition: (isBackBtnPressed) => {
      if (isBackBtnPressed) {
        return false;
      }
    },
  }
);

const initialState: IFiltersState = {
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categoriesList = action.payload;
    });
  },
});

export const { setFiltersValue } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
