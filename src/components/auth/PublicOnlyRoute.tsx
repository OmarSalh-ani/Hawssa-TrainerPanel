import { getToken } from '@/lib/utils/cookie';
import { Navigate, Outlet } from 'react-router-dom';

/** Logged-in users are redirected to the dashboard (former middleware behavior). */
export function PublicOnlyRoute() {
  const token = getToken()?.trim() || null;

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
