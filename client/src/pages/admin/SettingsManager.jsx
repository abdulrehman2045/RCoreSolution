import { useState } from 'react';
import { settingsApi } from '../../api/index.js';
import { Field, Notice, PageHeader } from '../../components/admin/AdminUI.jsx';
import { useSite } from '../../context/SiteContext.jsx';

// Each group becomes a card. Every field maps to a key in the settings document.
const SETTING_GROUPS = [
  {
    title: 'Home page',
    fields: [
      { name: 'siteName', label: 'Site name' },
      { name: 'heroTitle', label: 'Headline' },
      { name: 'heroSubtitle', label: 'Intro text', as: 'textarea', rows: 3 },
    ],
  },
  {
    title: 'Contact details',
    fields: [
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'phone', label: 'Phone (as shown on the site)' },
      {
        name: 'whatsappNumber',
        label: 'WhatsApp number',
        hint: 'Digits only, with country code. Example: 923184077453',
      },
      { name: 'businessHours', label: 'Business hours' },
    ],
  },
  {
    title: 'Footer and social links',
    fields: [
      { name: 'footerText', label: 'Footer description', as: 'textarea', rows: 2 },
      { name: 'facebookUrl', label: 'Facebook link', placeholder: 'https://facebook.com/...' },
      { name: 'instagramUrl', label: 'Instagram link', placeholder: 'https://instagram.com/...' },
      { name: 'linkedinUrl', label: 'LinkedIn link', placeholder: 'https://linkedin.com/...' },
    ],
  },
  {
    title: 'Search engines (SEO)',
    fields: [
      {
        name: 'metaDescription',
        label: 'Default description',
        as: 'textarea',
        rows: 3,
        hint: 'Shown in Google results when a page has no description of its own.',
      },
    ],
  },
];

const FIELD_NAMES = SETTING_GROUPS.flatMap((group) => group.fields.map((field) => field.name));

const pickFields = (settings) => Object.fromEntries(FIELD_NAMES.map((name) => [name, settings[name] ?? '']));

/** Waits for the website data, then shows the form (so it starts with the real values). */
export default function SettingsManager() {
  const { settings, ready, reload } = useSite();

  if (!ready) return <p className="muted">Loading…</p>;

  return <SettingsForm settings={settings} onSaved={reload} />;
}

function SettingsForm({ settings, onSaved }) {
  const [form, setForm] = useState(() => pickFields(settings));
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setFeedback({ type: '', text: '' });

    try {
      await settingsApi.update(form);
      await onSaved();
      setFeedback({ type: 'success', text: 'Settings saved. The website now shows your changes.' });
    } catch (error) {
      setFeedback({ type: 'error', text: error.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader title="Website settings" description="Text and contact details used across the public website." />

      <form className="settings-form" onSubmit={handleSubmit}>
        {feedback.text && <Notice type={feedback.type}>{feedback.text}</Notice>}

        {SETTING_GROUPS.map((group) => (
          <section key={group.title} className="panel">
            <h2 className="h3">{group.title}</h2>
            {group.fields.map(({ name, ...fieldProps }) => (
              <Field key={name} name={name} value={form[name]} onChange={handleChange} {...fieldProps} />
            ))}
          </section>
        ))}

        <div>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving…' : 'Save settings'}
          </button>
        </div>
      </form>
    </>
  );
}
