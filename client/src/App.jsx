import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import Account from './pages/Account.jsx';
import About from './pages/About.jsx';
import { Login, Register } from './pages/Auth.jsx';
import { Careers, Process } from './pages/Company.jsx';
import Contact from './pages/Contact.jsx';
import Detail from './pages/Detail.jsx';
import Home from './pages/Home.jsx';
import Hub from './pages/Hub.jsx';
import CatalogManager from './pages/admin/CatalogManager.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import MessagesManager from './pages/admin/MessagesManager.jsx';
import ReviewsManager from './pages/admin/ReviewsManager.jsx';
import SettingsManager from './pages/admin/SettingsManager.jsx';
import UsersManager from './pages/admin/UsersManager.jsx';

const CATALOG_KINDS = ['services', 'products', 'industries'];

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />

        {CATALOG_KINDS.map((kind) => (
          <Route key={kind} path={kind}>
            <Route index element={<Hub kind={kind} />} />
            <Route path=":slug" element={<Detail kind={kind} />} />
          </Route>
        ))}

        <Route path="company/process" element={<Process />} />
        <Route path="company/careers" element={<Careers />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="account" element={<Account />} />
        </Route>

        <Route path="*" element={<Hub kind="services" />} />
      </Route>

      <Route element={<ProtectedRoute adminOnly />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="services" element={<CatalogManager key="services" kind="services" />} />
          <Route path="products" element={<CatalogManager key="products" kind="products" />} />
          <Route path="users" element={<UsersManager />} />
          <Route path="reviews" element={<ReviewsManager />} />
          <Route path="messages" element={<MessagesManager />} />
          <Route path="settings" element={<SettingsManager />} />
        </Route>
      </Route>
    </Routes>
  );
}
