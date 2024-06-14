import React from 'react';
import cn from 'classnames';
import { FaRegSun } from 'react-icons/fa6';
import { BsCart4 } from 'react-icons/bs';
import { RiLogoutBoxRLine } from 'react-icons/ri';

import { Container } from './Container';

const headerWrapper = cn('flex', 'justify-between', 'py-4', 'text-white');
const navList = cn('flex', 'gap-x-2');
const controls = cn('flex', 'gap-x-4', 'items-center');

export function Header() {
  return (
    <header className="bg-slate-800 mb-4">
      <Container>
        <div className={headerWrapper}>
          <a href="#">WB 2.0</a>
          <nav>
            <ul className={navList}>
              <li>Главная</li>
              <li>Товары</li>
            </ul>
          </nav>
          <ul className={controls}>
            <li>
              <FaRegSun size={20} />
            </li>
            <li>
              <BsCart4 size={20} />
            </li>
            <li>
              <img src="#" alt="Your's avatar" />
            </li>
            <li>
              <RiLogoutBoxRLine size={20} />
            </li>
            <li>
              <select className="text-black">
                <option value="ru">RU</option>
                <option value="en">EN</option>
              </select>
            </li>
          </ul>
        </div>
      </Container>
    </header>
  );
}
