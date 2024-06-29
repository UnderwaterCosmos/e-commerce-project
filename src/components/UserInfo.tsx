import React from 'react';
import cn from 'classnames';

const allInfo = cn(
  'max-w-xl',
  'mx-auto',
  'flex',
  'justify-between',
  'items-center'
);

export function UserInfo() {
  return (
    <section className={allInfo}>
      <dl className="text-left">
        <dt className="inline">Почта: </dt>
        <dd className="inline">example@sample.com</dd>
        <br />
        <dt className="inline">Имя: </dt>
        <dd className="inline">Человеческое имя</dd>
        <br />
        <dt className="inline">Пароль: </dt>
        <dd className="inline">Квантовый пароль</dd>
        <br />
        <dt className="inline">Тип: </dt>
        <dd className="inline">Customer</dd>
      </dl>
      <div>
        <img src="/images/square.png" alt="КвАдРаТ !?!" />
      </div>
    </section>
  );
}
