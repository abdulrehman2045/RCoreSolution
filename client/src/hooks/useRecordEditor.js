import { useState } from 'react';

/**
 * State for a create/edit modal form.
 *
 * - `toForm(record)` turns a saved record into form values
 * - `toPayload(form)` turns form values into the API body
 * - `onSaved()` runs after a successful save (usually reloads the list)
 */
export function useRecordEditor({ api, emptyForm, toForm, toPayload = (form) => form, onSaved }) {
  const [editor, setEditor] = useState(null); // null = closed, { record } = open
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const open = (record) => {
    setForm(record ? toForm(record) : emptyForm);
    setError('');
    setEditor({ record });
  };

  const close = () => setEditor(null);

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      const payload = toPayload(form);
      if (editor.record) await api.update(editor.record._id, payload);
      else await api.create(payload);

      await onSaved();
      close();
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  return {
    isOpen: editor !== null,
    isEditing: Boolean(editor?.record),
    form,
    saving,
    error,
    openCreate: () => open(null),
    openEdit: open,
    close,
    handleChange,
    handleSubmit,
  };
}
