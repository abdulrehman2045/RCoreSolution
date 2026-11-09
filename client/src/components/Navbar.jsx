import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpg';
import { useAuth } from '../context/AuthContext.jsx';
import { useSite } from '../context/SiteContext.jsx';
import { getIcon } from '../lib/icons.js';
import { buildMenus } from '../lib/menus.js';

// Mega menus open on hover only on large screens with a real pointer.
const HOVER_QUERY = '(hover: hover) and (min-width: 1025px)';

export default function Navbar() {
  const { pathname } = useLocation();
  const { services, products } = useSite();
  const { user, isAdmin } = useAuth();

  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menus = buildMenus({ services, products });

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openOnHover = (name) => {
    if (window.matchMedia(HOVER_QUERY).matches) setOpenMenu(name);
  };

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`} onMouseLeave={() => openOnHover(null)}>
      <div className="wrap nav-in">
        <Link to="/" className="logo" aria-label="RCore Solutions home">
          <img src={logo} alt="RCore Solutions logo" width="76" height="76" />
        </Link>

        <button className="burger" aria-label="Toggle menu" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>

        <nav className={`links ${mobileOpen ? 'show' : ''}`} aria-label="Main">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>

          {Object.entries(menus).map(([name, menu]) => (
            <MenuItem
              key={name}
              name={name}
              menu={menu}
              isOpen={openMenu === name}
              onToggle={() => setOpenMenu(openMenu === name ? null : name)}
              onHover={() => openOnHover(name)}
            />
          ))}

          {isAdmin && <NavLink to="/admin">Admin</NavLink>}
          {user ? <NavLink to="/account">Account</NavLink> : <NavLink to="/login">Login</NavLink>}

          <NavLink to="/contact" className="btn btn-primary nav-cta">
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

function MenuItem({ name, menu, isOpen, onToggle, onHover }) {
  return (
    <div className={`has-mega ${isOpen ? 'open' : ''}`} onMouseEnter={onHover}>
      <button aria-expanded={isOpen} onClick={onToggle}>
        {name}
        <ChevronDown size={15} />
      </button>
      <MegaMenu menu={menu} />
    </div>
  );
}

function MegaMenu({ menu }) {
  return (
    <div className="mega">
      <div className="wrap mega-in">
        <div className="mega-side">
          <h3>{menu.title}</h3>
          <p>{menu.description}</p>
          <Link to={menu.to}>
            {menu.cta}
            <ArrowRight size={15} />
          </Link>
        </div>

        <ul className="mega-grid">
          {menu.items.map((item) => {
            const Icon = getIcon(item.icon);

            return (
              <li key={item.to}>
                <Link to={item.to}>
                  <Icon size={20} />
                  <span>
                    <b>{item.name}</b>
                    <small>{item.description}</small>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
