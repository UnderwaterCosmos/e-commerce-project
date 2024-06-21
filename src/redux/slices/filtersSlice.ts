import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IFiltersState,
  IFiltersData,
  ICategoriesElem,
} from '../../types/filters';

export const fetchCategories = createAsyncThunk.withTypes<{
  extra: {
    getCategories: () => Promise<ICategoriesElem[]>;
  };
}>()(
  'filters/fetchCategories',
  async (_: undefined, { rejectWithValue, extra: api }) => {
    try {
      return await api.getCategories();
    } catch (error) {
      return rejectWithValue(error);
    }
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
