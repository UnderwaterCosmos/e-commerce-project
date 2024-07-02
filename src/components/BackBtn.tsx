import React from 'react';
import cn from 'classnames';
import { FaArrowLeftLong } from 'react-icons/fa6';

const backBtn = cn('h-8', 'p-2', 'bg-slate-300', 'rounded-full');

export function BackBtn(props: React.HTMLProps<HTMLButtonElement>) {
  return (
    <button {...props} type="button" className={backBtn}>
      <FaArrowLeftLong />
    </button>
  );
}
