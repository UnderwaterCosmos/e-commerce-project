import React from 'react';
import cn from 'classnames';

const formBtn = cn(
  'bg-primary-blue',
  'transition-all',
  'hover:bg-hover-blue',
  'active:bg-active-blue',
  'text-white',
  'py-2.5',
  'rounded-main'
);

interface IProps {
  children: React.ReactNode;
}

export function FormBtn({ children }: IProps) {
  return <button className={formBtn}>{children}</button>;
}
