import React from 'react';
import cn from 'classnames';

import { Container } from '../components/Container';

const regForm = cn(
  'flex',
  'flex-col',
  'max-w-lg',
  'mx-auto',
  'mb-3',
  'p-5',
  'border-2'
);
const inputField = cn('bg-slate-200', 'rounded-full', 'mb-2', 'p-1.5');

export function RegistrationForm() {
  return (
    <main className="grow">
      <Container>
        <div className="text-center">
          <h1 className="mb-3">РЕГИСТРАЦИЯ</h1>
          <form className={regForm}>
            <label htmlFor="email">Почта:</label>
            <input
              className={inputField}
              id="email"
              placeholder="Введите Email"
              required
            />
            <label htmlFor="password">Пароль:</label>
            <input
              className={inputField}
              id="password"
              placeholder="Введите пароль"
              required
            />
            <label htmlFor="login">Логин:</label>
            <input
              className={inputField}
              id="login"
              placeholder="Введите логин"
              required
            />
            <label htmlFor="avatar">Аватар:</label>
            <input
              className={inputField}
              id="avatar"
              placeholder="Добавьте URL аватара"
              required
            />
            <label htmlFor="userType">Тип пользователя:</label>
            <select className={inputField} id="userType">
              <option value="customer">Покупатель</option>
              <option value="admin">Администратор</option>
            </select>
            <button className="bg-emerald-200 rounded-full mt-3">
              ЗАРЕГИСТРИРОВАТЬСЯ
            </button>
          </form>
          <p>
            Если Вы уже зарегистрированы -{' '}
            <a className="text-blue-600" href="#">
              войдите
            </a>
          </p>
        </div>
      </Container>
    </main>
  );
}
