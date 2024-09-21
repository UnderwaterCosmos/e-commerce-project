import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  selectNotificationData,
  useAppSelector,
  useAppDispatch,
} from '../../redux/store';
import { clearNotification } from '../../redux/slices/notificationSlice';
import { useTheme } from '../../hooks/useTheme';

export function Notification() {
  const { type, message } = useAppSelector(selectNotificationData);
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const screenWidth = document.documentElement.clientWidth;
	const isMobileScreen = screenWidth > 345 && screenWidth < 905

  React.useEffect(() => {
    if (type === 'success') {
      toast.success(message);
      dispatch(clearNotification());
    }
    if (type === 'error') {
      toast.error(message);
      dispatch(clearNotification());
    }
  }, [dispatch, message, type]);

  return (
    <ToastContainer
      position="top-right"
      theme={theme === 'light' ? 'light' : 'dark'}
      closeOnClick
      draggable
      autoClose={ isMobileScreen ? 1000 : 2000}
    />
  );
}
