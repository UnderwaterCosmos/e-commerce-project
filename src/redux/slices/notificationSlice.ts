import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface INotification {
  type: string;
  message: string;
}

const initialState: INotification = {
  type: '',
  message: '',
};

const notificationSlice = createSlice({
  name: '@notification',
  initialState,
  reducers: {
    setNotification: (_, action: PayloadAction<INotification>) =>
      action.payload,
    clearNotification: () => initialState,
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
