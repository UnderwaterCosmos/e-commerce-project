import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const mobileMenuSlice = createSlice({
  name: '@mobileMenu',
  initialState: false,
  reducers: {
    setMobileMenuActive: (_, action: PayloadAction<boolean>) => action.payload,
  },
});

export const { setMobileMenuActive } = mobileMenuSlice.actions;
export const mobileMenuReducer = mobileMenuSlice.reducer;
