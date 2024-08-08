import cn from 'classnames';

import { useAppSelector, selectUsersData } from '../redux/store';

const allInfo = cn(
  'max-w-xl',
  'mx-auto',
  'flex',
  'flex-col',
  'justify-between',
  'items-center'
);

export function UserInfo() {
  const fullUserInfo = useAppSelector(selectUsersData).fullUserInfo;

  return (
    <main className={allInfo}>
      <img
        className="rounded-full mb-6"
        src={fullUserInfo?.avatarUrl}
        width={170}
        alt={`${fullUserInfo?.login}'s portrait`}
      />
      <dl className="text-center">
        <dt className="inline font-semibold text-xl">Логин: </dt>
        <dd className="inline text-xl">{fullUserInfo?.login}</dd>
        <br />
        <dt className="inline font-semibold text-xl">Почта: </dt>
        <dd className="inline text-xl">{fullUserInfo?.email}</dd>
        <br />
        <dt className="inline font-semibold text-xl">Тип профиля: </dt>
        <dd className="inline text-xl">{fullUserInfo?.type}</dd>
      </dl>
    </main>
  );
}
