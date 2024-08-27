import cn from 'classnames';

import {
  selectMobileMenuData,
  useAppDispatch,
  useAppSelector,
} from '../../redux/store';
import { setMobileMenuActive } from '../../redux/slices/mobileMenuSlice';

export function BurgerBtn() {
  const mobileIsActive = useAppSelector(selectMobileMenuData);
  const dispatch = useAppDispatch();

  const burgerBtn = cn(
    'after:absolute',
    'after:bottom-[3px]',
    'after:w-[18px]',
    'after:h-0.5',
    'after:bg-primary-black',
    'before:absolute',
    'before:top-[3px]',
    'before:w-[18px]',
    'before:h-0.5',
    'before:bg-primary-black',
    'w-[18px]',
    'h-5',
    'ml-1',
    'relative',
    'cursor-pointer',
    'dark:after:bg-[#fff]',
    'dark:before:bg-[#fff]',
    {
      'after:rotate-[-45deg] before:rotate-[45deg] after:bottom-[9px] before:top-[9px]':
        mobileIsActive,
    }
  );
  const middleBar = cn(
    'absolute',
    'top-[9px]',
    'w-[18px]',
    'h-0.5',
    'bg-primary-black',
    'dark:bg-[#fff]',
    { hidden: mobileIsActive }
  );

  return (
    <nav className="descTop:hidden">
      <div
        className={burgerBtn}
        onClick={() => dispatch(setMobileMenuActive(!mobileIsActive))}
      >
        <span className={middleBar} />
      </div>
    </nav>
  );
}
