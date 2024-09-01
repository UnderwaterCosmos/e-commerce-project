import cn from 'classnames';

import { PathToProductsBtn } from '../components/UI/PathToProductsBtn';

const mainBlock = cn(
  'h-[100vh]',
  'flex',
  'justify-center',
  'items-center',
  'flex-col',
  'gap-y-8',
  'dark:text-white'
);

export function NotFound() {
  return (
    <main className={mainBlock}>
      <h1 className="text-7xl min-365-max-640:text-3xl min-641-max-904:text-5xl">
        Страница не найдена :(
      </h1>
      <PathToProductsBtn>Вернуться к каталогу товаров</PathToProductsBtn>
    </main>
  );
}
