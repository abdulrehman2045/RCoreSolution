import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { useSite } from '../context/SiteContext.jsx';

const toLinks = (items) => items.map((item) => ({ name: item.name, to: item.to }));

export default function Footer() {
  const { settings, services, products, industries } = useSite();

  const columns = [
    {
      title: 'Company',
      links: [
        { name: 'About', to: '/about' },
        { name: 'Process', to: '/company/process' },
        { name: 'Careers', to: '/company/careers' },
        { name: 'Contact', to: '/contact' },
      ],
    },
    { title: 'Services', links: toLinks(services.slice(0, 6)) },
    { title: 'Products', links: toLinks(products) },
    { title: 'Industries', links: toLinks(industries.slice(0, 6)) },
  ];

  const socialLinks = [
    { name: 'Facebook', url: settings.facebookUrl },
    { name: 'Instagram', url: settings.instagramUrl },
    { name: 'LinkedIn', url: settings.linkedinUrl },
  ].filter((link) => link.url);

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link to="/" className="logo">
              <img className="logo-lg" src={logo} alt="RCore Solutions logo" width="72" height="72" />
            </Link>
            <p>{settings.footerText}</p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3>{column.title}</h3>
              {column.links.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.name}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="foot-bottom">
          <small>
            © {new Date().getFullYear()} {settings.siteName}. All rights reserved.
          </small>
          <div>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
            <a href={`https://wa.me/${settings.whatsappNumber}`}>WhatsApp</a>
            {socialLinks.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
