import { getToken } from '@/lib/utils/cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function ProtectedRoute() {
  const location = useLocation();
  const token = getToken()?.trim() || null;

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
