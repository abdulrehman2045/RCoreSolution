import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const COPY = {
  login: {
    title: 'Log in',
    intro: 'Welcome back. Log in to leave reviews and send messages.',
    submit: 'Log in',
    switchText: "Don't have an account?",
    switchLink: { to: '/register', label: 'Sign up' },
  },
  register: {
    title: 'Create your account',
    intro: 'Sign up to leave a review and keep track of your messages.',
    submit: 'Create account',
    switchText: 'Already have an account?',
    switchLink: { to: '/login', label: 'Log in' },
  },
};

function AuthForm({ mode }) {
  const isLogin = mode === 'login';
  const copy = COPY[mode];

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const user = isLogin
        ? await login({ email: form.email, password: form.password })
        : await register(form);

      const defaultPage = user.role === 'admin' ? '/admin' : '/';
      navigate(location.state?.from || defaultPage, { replace: true });
    } catch (submitError) {
      setError(submitError.message);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo title={copy.title} noIndex />

      <section className="section">
        <div className="wrap auth-wrap">
          <div className="auth-card">
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>

            <form onSubmit={handleSubmit}>
              {error && <p className="form-error">{error}</p>}

              {!isLogin && (
                <label>
                  Name
                  <input name="name" value={form.name} onChange={handleChange} required />
                </label>
              )}
              <label>
                Email
                <input name="email" type="email" value={form.email} onChange={handleChange} required />
              </label>
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  minLength={isLogin ? undefined : 6}
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </label>

              <button className="btn btn-primary" type="submit" disabled={submitting}>
                {submitting ? 'Please wait…' : copy.submit}
              </button>
            </form>

            <p className="auth-switch">
              {copy.switchText} <Link to={copy.switchLink.to}>{copy.switchLink.label}</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export const Login = () => <AuthForm mode="login" />;
export const Register = () => <AuthForm mode="register" />;
