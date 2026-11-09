import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, messagesApi } from '../api/index.js';
import Seo from '../components/Seo.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { formatDate } from '../lib/format.js';

export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Seo title="My Account" noIndex />

      <section className="page-hero">
        <div className="wrap account-head">
          <div>
            <h1>My Account</h1>
            <p className="lead">{user.email}</p>
          </div>
          <button type="button" className="btn btn-ghost" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </section>

      <section className="section">
        <div className="wrap account-grid">
          <ProfileForm />
          <PasswordForm />
        </div>
      </section>

      <section className="section alt">
        <div className="wrap narrow">
          <MyMessages />
        </div>
      </section>
    </>
  );
}

function ProfileForm() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user.name);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await authApi.updateProfile({ name });
      setUser(data.user);
      setFeedback({ type: 'success', text: 'Profile updated.' });
    } catch (error) {
      setFeedback({ type: 'error', text: error.message });
    }
  };

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <h2 className="h3">Profile</h2>
      {feedback.text && <p className={`form-${feedback.type}`}>{feedback.text}</p>}
      <label>
        Name
        <input value={name} onChange={(event) => setName(event.target.value)} required />
      </label>
      <button className="btn btn-primary" type="submit">
        Save profile
      </button>
    </form>
  );
}

function PasswordForm() {
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const handleChange = (event) => {
    setPasswords({ ...passwords, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await authApi.changePassword(passwords);
      setPasswords({ currentPassword: '', newPassword: '' });
      setFeedback({ type: 'success', text: 'Password changed.' });
    } catch (error) {
      setFeedback({ type: 'error', text: error.message });
    }
  };

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <h2 className="h3">Change password</h2>
      {feedback.text && <p className={`form-${feedback.type}`}>{feedback.text}</p>}
      <label>
        Current password
        <input
          name="currentPassword"
          type="password"
          value={passwords.currentPassword}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        New password
        <input
          name="newPassword"
          type="password"
          minLength={6}
          value={passwords.newPassword}
          onChange={handleChange}
          required
        />
      </label>
      <button className="btn btn-primary" type="submit">
        Update password
      </button>
    </form>
  );
}

function MyMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    messagesApi
      .listMine()
      .then((data) => setMessages(data.items))
      .catch((loadError) => setError(loadError.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h2>My messages</h2>

      {loading && <p>Loading…</p>}
      {error && <p className="form-error">{error}</p>}
      {!loading && !error && messages.length === 0 && <p>You have not sent any messages yet.</p>}

      <div className="message-list">
        {messages.map((message) => (
          <article key={message._id} className="card">
            <div className="message-meta">
              <b>{message.service || 'General enquiry'}</b>
              <span className={`status status-${message.status}`}>{message.status}</span>
            </div>
            <p>{message.details}</p>
            <small>Sent on {formatDate(message.createdAt)}</small>
          </article>
        ))}
      </div>
    </>
  );
}
