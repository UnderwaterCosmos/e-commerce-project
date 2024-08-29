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
    'min-641-max-904:w-[30px]',
    'min-641-max-904:h-[25px]',
    'min-641-max-904:after:w-[30px]',
    'min-641-max-904:after:h-[3px]',
    'min-641-max-904:after:bottom-0',
    'min-641-max-904:before:w-[30px]',
    'min-641-max-904:before:h-[3px]',
    'min-641-max-904:before:top-[6px]',
    {
      'after:rotate-[-45deg] before:rotate-[45deg] after:bottom-[9px] before:top-[9px] min-641-max-904:after:bottom-[14px] min-641-max-904:before:top-[8px]':
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
    'min-641-max-904:w-[30px]',
    'min-641-max-904:h-[3px]',
    'min-641-max-904:top-[14px]',
    { hidden: mobileIsActive }
  );

  return (
    <nav className="min-905:hidden">
      <div
        className={burgerBtn}
        onClick={() => dispatch(setMobileMenuActive(!mobileIsActive))}
      >
        <span className={middleBar} />
      </div>
    </nav>
  );
}
