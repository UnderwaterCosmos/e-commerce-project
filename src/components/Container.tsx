import React from 'react';
import cn from 'classnames';

const container = cn('max-w-7xl', 'px-2.5', 'mx-auto');

interface IContainer {
  children: React.ReactNode;
}

export function Container({ children }: IContainer) {
  return <div className={container}>{children}</div>;
}
