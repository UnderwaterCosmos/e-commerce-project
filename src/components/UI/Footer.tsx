import React from 'react';
import cn from 'classnames';

const footer = cn(
  'text-center',
  'text-[#9A9A9A]',
  'my-10',
  'text-sm/[18px]',
  'max-904:text-xs'
);

export default React.memo(function Footer() {
  return (
    <footer className={footer}>
      By UnderwaterCosmos, Frontend Engineer, 2024
    </footer>
  );
});
