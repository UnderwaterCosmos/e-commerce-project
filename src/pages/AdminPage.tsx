import { Outlet } from 'react-router-dom';

import { CheckAccess } from '../components/CheckAccess';
import { AdminControls } from '../components/AdminControls';

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
