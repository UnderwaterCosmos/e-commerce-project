import { Outlet } from 'react-router-dom';

import { UserControls } from './UserControls';

export function UserPage() {
  return (
    <div className="grow text-center">
      <UserControls />
      <Outlet />
    </div>
  );
}
