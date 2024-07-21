import React from 'react';
import cn from 'classnames';

const container = cn('max-w-[1320px]', 'px-2.5', 'mx-auto');

interface IContainer {
  children: React.ReactNode;
}

export function Container({ children }: IContainer) {
  return <div className={container}>{children}</div>;
}
