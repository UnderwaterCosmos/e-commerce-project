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
      <h1 className="text-7xl">Страница не найдена :(</h1>
      <PathToProductsBtn>Вернуться к каталогу товаров</PathToProductsBtn>
    </main>
  );
}
