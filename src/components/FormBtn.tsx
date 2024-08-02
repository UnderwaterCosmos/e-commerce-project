import React from 'react';

interface IProps {
  children: React.ReactNode;
}

export function FormBtn({ children }: IProps) {
  return (
    <button className="bg-primary-blue text-white py-2.5 rounded-main">
      {children}
    </button>
  );
}
