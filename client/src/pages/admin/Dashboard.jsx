import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { statsApi } from '../../api/index.js';
import { ListStatus, PageHeader } from '../../components/admin/AdminUI.jsx';

const STAT_CARDS = [
  { key: 'services', label: 'Services', to: '/admin/services' },
  { key: 'products', label: 'Products', to: '/admin/products' },
  { key: 'users', label: 'Users', to: '/admin/users' },
  { key: 'reviews', label: 'Reviews', to: '/admin/reviews' },
  { key: 'messages', label: 'Messages', to: '/admin/messages' },
  { key: 'newMessages', label: 'Unread messages', to: '/admin/messages' },
];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    statsApi
      .get()
      .then((data) => setStats(data.stats))
      .catch((loadError) => setError(loadError.message));
  }, []);

  return (
    <>
      <PageHeader title="Dashboard" description="A quick look at your website." />

      <ListStatus loading={!stats && !error} error={error} />

      {stats && (
        <div className="stat-grid">
          {STAT_CARDS.map((card) => (
            <Link key={card.key} to={card.to} className="stat-card">
              <strong>{stats[card.key]}</strong>
              <span>{card.label}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
