import React from 'react';

interface IProps {
  children: React.ReactNode;
}

export function Container({ children }: IProps) {
  return <div className="max-w-[1320px] px-2.5 mx-auto">{children}</div>;
}
