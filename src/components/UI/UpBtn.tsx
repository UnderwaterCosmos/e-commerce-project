import React from 'react';
import cn from 'classnames';

export function UpBtn() {
  const [isVisible, setIsVisible] = React.useState(false);
  const upBtn = cn(
    'fixed',
    'z-10',
    'p-0',
    'bottom-20',
    'right-14',
    'w-16',
    'h-16',
    'text-4xl',
    'font-bold',
    'text-center',
    'align-middle',
    'border-4',
    'rounded-full',
    'cursor-pointer',
    'transition-all',
    'hidden',
    {
      '!inline-block': isVisible,
    }
  );

  const toggleIsVisible = () => {
    if (window.scrollY > 1000) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  window.addEventListener('scroll', toggleIsVisible);

  return (
    <button
      type="button"
      className={upBtn}
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
    >
      ↑
    </button>
  );
}
