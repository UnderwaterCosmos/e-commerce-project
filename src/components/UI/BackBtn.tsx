import React from 'react';
import cn from 'classnames';

const backBtn = cn(
  'w-[42px]',
  'h-[42px]',
  'p-2',
  'bg-slate-300',
  'rounded-main'
);

export function BackBtn(props: React.HTMLProps<HTMLButtonElement>) {
  return (
    <button {...props} type="button" className={backBtn}>
      <img className="inline-block" src="/images/back-arrow.svg" alt="back" />
    </button>
  );
}
