import { Outlet } from 'react-router-dom';

import { UserControls } from '../components/UserControls';

export function UserPage() {
  return (
    <div className="grow text-center">
      <UserControls />
      <Outlet />
    </div>
  );
}
