import React from 'react';
import cn from 'classnames';

interface IProps {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export function Modal({ modalActive, setModalActive, children }: IProps) {
  const modal = cn(
    'h-screen',
    'w-screen',
    'bg-black/40',
    'fixed',
    'top-0',
    'left-0',
    'flex',
    'justify-center',
    'items-center',
    'opacity-0',
    'duration-500',
    'pointer-events-none',
    { 'opacity-100 pointer-events-auto': modalActive }
  );
  const content = cn(
    'w-[601px]',
    'p-4',
    'rounded-main',
    'bg-white',
    'duration-300',
    'transition all',
    'dark:bg-dark-background',
    'dark:border',
    'dark:border-hover-black',
    'min-365-max-640:w-[343px]',
  );

  return (
    <div className={modal} onClick={() => setModalActive(false)}>
      <div className={content} onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
