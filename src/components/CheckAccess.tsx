import React from 'react';
import { useNavigate } from 'react-router-dom';

import { selectUsersData, useAppSelector } from '../redux/store';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface IProps {
  children: React.ReactNode;
}

export function CheckAccess({ children }: IProps) {
  const fullUserInfo = useAppSelector(selectUsersData).fullUserInfo;
  const navigate = useNavigate();
  const token = useLocalStorage('token');

  React.useEffect(() => {
    if (!token.getItem() || fullUserInfo?.type !== 'admin') {
      navigate('/main');
    }
  }, []);

  return children;
}
