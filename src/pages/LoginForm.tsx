import React from 'react';
import cn from 'classnames';

import { Container } from '../components/Container';

const loginForm = cn(
  'flex',
  'flex-col',
  'max-w-lg',
  'mx-auto',
  'mb-3',
  'p-5',
  'border-2'
);
const inputField = cn('bg-slate-200', 'rounded-full', 'mb-2', 'p-1.5');

export function LoginForm() {
  return (
    <main className="grow">
      <Container>
        <div className="text-center">
          <h1 className="mb-3">ВXОД</h1>
          <form className={loginForm}>
            <label htmlFor="login">Login:</label>
            <input
              className={inputField}
              id="login"
              placeholder="Введите логин"
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              className={inputField}
              id="password"
              placeholder="Введите пароль"
              required
            />
            <button className="bg-emerald-200 rounded-full mt-3">ВОЙТИ</button>
          </form>
          <p>
            Если Вы еще не зарегистрированы -{' '}
            <a className="text-blue-600" href="#">
              зарегистрируйтесь
            </a>
          </p>
        </div>
      </Container>
    </main>
  );
}
