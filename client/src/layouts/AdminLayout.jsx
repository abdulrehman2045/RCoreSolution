import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Boxes,
  Code2,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Star,
  Users,
} from 'lucide-react';
import logo from '../assets/logo.jpg';
import Seo from '../components/Seo.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/services', label: 'Services', icon: Code2 },
  { to: '/admin/products', label: 'Products', icon: Boxes },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/reviews', label: 'Reviews', icon: Star },
  { to: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin">
      <Seo title="Admin" noIndex />

      <aside className="admin-side">
        <Link to="/admin" className="admin-brand">
          <img src={logo} alt="RCore Solutions" width="40" height="40" />
          <span>Admin panel</span>
        </Link>

        <nav className="admin-nav" aria-label="Admin">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-side-foot">
          <small>{user.email}</small>
          <Link to="/">
            <ExternalLink size={16} />
            View website
          </Link>
          <button type="button" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
