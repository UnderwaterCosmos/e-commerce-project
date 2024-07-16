import React from 'react';
import cn from 'classnames';

import { useAppSelector, selectUsersData } from '../redux/store';

const allInfo = cn(
  'max-w-xl',
  'mx-auto',
  'flex',
  'justify-between',
  'items-center'
);

export function UserInfo() {
  const fullUserInfo = useAppSelector(selectUsersData).fullUserInfo;

  return (
    <main className={allInfo}>
      <dl className="text-left">
        <dt className="inline">Почта: </dt>
        <dd className="inline">{fullUserInfo?.email}</dd>
        <br />
        <dt className="inline">Логин: </dt>
        <dd className="inline">{fullUserInfo?.login}</dd>
        <br />
        <dt className="inline">Тип профиля: </dt>
        <dd className="inline">{fullUserInfo?.type}</dd>
      </dl>
      <div>
        <img
          src={fullUserInfo?.avatarUrl}
          width={300}
          height={300}
          alt={`${fullUserInfo?.login}'s portrait`}
        />
      </div>
    </main>
  );
}
