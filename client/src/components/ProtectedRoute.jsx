import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Loader from './Loader.jsx';

/** Only lets logged-in users in. With `adminOnly`, only admins. */
export default function ProtectedRoute({ adminOnly = false }) {
  const { user, checking } = useAuth();
  const location = useLocation();

  if (checking) return <Loader show />;

  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" replace />;

  return <Outlet />;
}
