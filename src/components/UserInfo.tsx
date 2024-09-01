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
const term = cn(
  'inline',
  'font-semibold',
  'text-xl',
  'dark:text-white',
  'min-365-max-640:text-lg'
);
const descr = cn(
  'inline',
  'text-xl',
  'dark:text-white',
  'min-365-max-640:text-lg'
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
        <dt className={term}>Логин: </dt>
        <dd className={descr}>{fullUserInfo?.login}</dd>
        <br />
        <dt className={term}>Почта: </dt>
        <dd className={descr}>{fullUserInfo?.email}</dd>
        <br />
        <dt className={term}>Тип профиля: </dt>
        <dd className={descr}>{fullUserInfo?.type}</dd>
      </dl>
    </main>
  );
}
