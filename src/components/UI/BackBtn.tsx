import React from 'react';
import cn from 'classnames';

import { useTheme } from '../../hooks/useTheme';

const backBtn = cn(
  'w-[42px]',
  'h-[42px]',
  'p-2',
  'rounded-main',
  'bg-primary-gray',
  'hover:bg-hover-gray',
  'active:bg-active-gray',
  'dark:bg-hover-black',
  'dark:hover:bg-active-black',
  'dark:active:bg-dark-active-black',
);

export function BackBtn(props: React.HTMLProps<HTMLButtonElement>) {
  const { theme } = useTheme();

  return (
    <button {...props} type="button" className={backBtn}>
      <svg
        className="inline-block"
        width="14"
        height="10"
        viewBox="0 0 14 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.6673 4.16667L3.52565 4.16667L6.50898 1.175L5.33398 0L0.333984 5L5.33398 10L6.50898 8.825L3.52565 5.83333L13.6673 5.83333V4.16667Z"
          fill={theme === 'light' ? '#1D1D1D' : '#fff'}
        />
      </svg>
    </button>
  );
}
