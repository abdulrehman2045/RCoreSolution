import { useEffect } from 'react';
import { X } from 'lucide-react';

export function PageHeader({ title, description, action }) {
  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </header>
  );
}

export function Notice({ type = 'error', children }) {
  return <div className={`notice notice-${type}`}>{children}</div>;
}

/** Shows a loading / error / empty message for a list. Renders nothing when there is data. */
export function ListStatus({ loading, error, isEmpty, emptyText }) {
  if (loading) return <p className="muted">Loading…</p>;
  if (error) return <Notice>{error}</Notice>;
  if (isEmpty) return <p className="muted">{emptyText}</p>;
  return null;
}

export function Badge({ tone = 'neutral', children }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

/** Label + input. Use `as="textarea"` or `as="select"` for other controls. */
export function Field({ label, as: Control = 'input', hint, children, ...props }) {
  return (
    <label className="field">
      <span>{label}</span>
      <Control {...props}>{children}</Control>
      {hint && <small>{hint}</small>}
    </label>
  );
}

export function CheckboxField({ label, ...props }) {
  return (
    <label className="checkbox-field">
      <input type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  );
}

/** A modal dialog wrapping a form with Save / Cancel buttons. */
export function FormModal({ title, onClose, onSubmit, saving, error, children }) {
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
        <header className="modal-head">
          <h2>{title}</h2>
          <button type="button" className="icon-btn" aria-label="Close" onClick={onClose}>
            <X size={18} />
          </button>
        </header>

        <form onSubmit={onSubmit}>
          {error && <Notice>{error}</Notice>}
          {children}
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
