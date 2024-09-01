import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

const back = cn(
  'text-2xl',
  'text-white',
  'p-3',
  'rounded-main',
  'bg-primary-blue',
  'transition-all',
  'hover:bg-hover-blue',
  'active:bg-active-blue',
  'min-365-max-640:text-lg'
);

interface IProps {
  children: React.ReactNode;
}

export function PathToProductsBtn({ children }: IProps) {
  return (
    <Link to="/products" className={back}>
      {children}
    </Link>
  );
}
