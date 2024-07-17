import { Link } from 'react-router-dom';
import cn from 'classnames';

interface IProps {
  link: {
    name: string;
    path: string;
  };
  path: string;
}

export function NavListItem({ link, path }: IProps) {
  const navListItem = cn('text-main-black', 'px-4', 'py-1.5', 'rounded-lg', {
    'bg-white': path.startsWith(link.path),
  });

  return (
    <li className={navListItem}>
      <Link to={link.path}>{link.name}</Link>
    </li>
  );
}
