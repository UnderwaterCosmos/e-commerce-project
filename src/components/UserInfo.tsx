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
const descrTerm = cn('inline', 'font-semibold', 'text-xl', 'dark:text-white');

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
        <dt className={descrTerm}>Логин: </dt>
        <dd className="inline text-xl dark:text-white">
          {fullUserInfo?.login}
        </dd>
        <br />
        <dt className={descrTerm}>
          Почта:{' '}
        </dt>
        <dd className="inline text-xl dark:text-white">
          {fullUserInfo?.email}
        </dd>
        <br />
        <dt className={descrTerm}>
          Тип профиля:{' '}
        </dt>
        <dd className="inline text-xl dark:text-white">{fullUserInfo?.type}</dd>
      </dl>
    </main>
  );
}
