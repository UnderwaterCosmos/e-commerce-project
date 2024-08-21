import cn from 'classnames';

import { useTheme } from '../../hooks/useTheme';

export function ThemeSwitcher() {
  const { theme, themeToggler } = useTheme();

  const switcher = cn(
    'w-14',
    'h-7',
    'flex',
    'gap-x-1',
    'items-center',
    'p-0.5',
    'rounded-full',
		'cursor-pointer',
    {
      'bg-[#FFDB4D]': theme === 'light',
      'bg-primary-blue': theme === 'dark',
    }
  );

  return (
    <>
      {theme === 'light' ? (
        <div className={switcher} onClick={themeToggler}>
          <img src="/images/sun.svg" alt="sun" className="ml-auto" />
          <div className="w-6 h-6 rounded-full bg-white" />
        </div>
      ) : (
        <div className={switcher} onClick={themeToggler}>
          <div className="w-6 h-6 rounded-full bg-white" />
          <img src="/images/moon.svg" alt="moon" className="mr-auto" />
        </div>
      )}
    </>
  );
}
