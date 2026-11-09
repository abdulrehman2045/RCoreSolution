import { useEffect, useState } from 'react';
import { Clock, Mail, MessageCircle } from 'lucide-react';
import { messagesApi } from '../api/index.js';
import Seo from '../components/Seo.jsx';
import { Btn } from '../components/UI.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useSite } from '../context/SiteContext.jsx';

const BUDGET_OPTIONS = ['Not sure yet', 'Small project', 'Medium project', 'Large project'];

const EMPTY_FORM = {
  name: '',
  business: '',
  email: '',
  phone: '',
  service: '',
  budget: BUDGET_OPTIONS[0],
  details: '',
};

export default function Contact() {
  const { settings, services } = useSite();
  const { user } = useAuth();

  const [form, setForm] = useState(EMPTY_FORM);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill name and email for logged-in users.
  useEffect(() => {
    if (!user) return;
    setForm((current) => ({
      ...current,
      name: current.name || user.name,
      email: current.email || user.email,
    }));
  }, [user]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    setError('');

    try {
      await messagesApi.send(form);
      setSent(true);
      setForm({ ...EMPTY_FORM, name: user?.name ?? '', email: user?.email ?? '' });
    } catch (sendError) {
      setError(sendError.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Seo
        title="Contact Us for a Software or Website Project"
        description="Contact RCore Solutions by WhatsApp, email or form to discuss a website, custom software, CRM, ERP or AI automation project."
      />

      <section className="page-hero">
        <div className="wrap">
          <h1>Contact {settings.siteName}</h1>
          <p className="lead">
            Tell us about your website or software project. We reply to talk through scope and next steps.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap contact">
          {sent ? (
            <div className="callout">
              <h2>Message sent</h2>
              <p>
                Thank you! We have received your message and will get back to you soon. You can also reach us
                directly on WhatsApp.
              </p>
              <div className="row">
                <Btn href={`https://wa.me/${settings.whatsappNumber}`}>Chat on WhatsApp</Btn>
                <button type="button" className="btn btn-ghost" onClick={() => setSent(false)}>
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <p className="form-error">{error}</p>}

              <div className="two">
                <label>
                  Name
                  <input name="name" value={form.name} onChange={handleChange} required />
                </label>
                <label>
                  Business Name
                  <input name="business" value={form.business} onChange={handleChange} />
                </label>
              </div>

              <div className="two">
                <label>
                  Email
                  <input name="email" type="email" value={form.email} onChange={handleChange} required />
                </label>
                <label>
                  Phone / WhatsApp
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange} />
                </label>
              </div>

              <div className="two">
                <label>
                  Service Needed
                  <select name="service" value={form.service} onChange={handleChange}>
                    <option value="">General enquiry</option>
                    {services.map((service) => (
                      <option key={service.slug} value={service.name}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Budget Range
                  <select name="budget" value={form.budget} onChange={handleChange}>
                    {BUDGET_OPTIONS.map((budget) => (
                      <option key={budget}>{budget}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                Project Details
                <textarea name="details" rows="5" value={form.details} onChange={handleChange} required />
              </label>

              <button className="btn btn-primary" type="submit" disabled={sending}>
                {sending ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}

          <aside className="stack">
            <div className="line">
              <MessageCircle size={18} />
              <h3>WhatsApp</h3>
              <p>
                <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noreferrer">
                  {settings.phone}
                </a>
              </p>
            </div>
            <div className="line">
              <Mail size={18} />
              <h3>Email</h3>
              <p>
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
              </p>
            </div>
            <div className="line">
              <Clock size={18} />
              <h3>Business Hours</h3>
              <p>{settings.businessHours}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
