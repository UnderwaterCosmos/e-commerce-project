import { Outlet } from 'react-router-dom';

import { User } from '../components/User';

export function UserPage() {
  return (
    <div className="grow text-center">
      <User />
      <Outlet />
    </div>
  );
}
