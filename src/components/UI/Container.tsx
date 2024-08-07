import React from 'react';

interface IContainer {
  children: React.ReactNode;
}

export function Container({ children }: IContainer) {
  return <div className="max-w-[1320px] px-2.5 mx-auto">{children}</div>;
}
