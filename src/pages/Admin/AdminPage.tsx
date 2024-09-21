import { Outlet } from 'react-router-dom';

import { CheckAccess } from './CheckAccess';
import { AdminControls } from './AdminControls';

export function AdminPage() {
  return (
    <div className="grow text-center">
      <CheckAccess>
        <AdminControls />
        <Outlet />
      </CheckAccess>
    </div>
  );
}
