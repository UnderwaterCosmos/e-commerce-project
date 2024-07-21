import { Link } from 'react-router-dom';
import cn from 'classnames';

const mainBlock = cn(
  'h-[100vh]',
  'flex',
  'justify-center',
  'items-center',
  'flex-col',
  'gap-y-8'
);
const back = cn(
  'text-3xl',
  'text-white',
  'border',
  'p-5',
  'rounded-main',
  'bg-primary-blue'
);

export function NotFound() {
  return (
    <main className={mainBlock}>
      <h1 className="text-7xl">Страница не найдена :(</h1>
      <Link to="/products" className={back}>
        Вернуться к каталогу товаров
      </Link>
    </main>
  );
}
