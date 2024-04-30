import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/authcontext/authCustomHook';

interface RequireAuthProps {
  children: React.ReactNode;
}
export default function RequireAuth({ children }:RequireAuthProps) {
  const location = useLocation();
  const { logState } = useAuth();
  return logState ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}

