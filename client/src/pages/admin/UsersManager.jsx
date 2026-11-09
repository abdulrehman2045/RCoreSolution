import { Pencil, Plus, Trash2 } from 'lucide-react';
import { usersApi } from '../../api/index.js';
import {
  Badge,
  CheckboxField,
  Field,
  FormModal,
  ListStatus,
  Notice,
  PageHeader,
} from '../../components/admin/AdminUI.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useActionRunner } from '../../hooks/useActionRunner.js';
import { useRecordEditor } from '../../hooks/useRecordEditor.js';
import { useRemoteList } from '../../hooks/useRemoteList.js';
import { formatDate } from '../../lib/format.js';

const EMPTY_FORM = { name: '', email: '', password: '', role: 'user', isActive: true };

const toForm = (user) => ({
  name: user.name,
  email: user.email,
  password: '',
  role: user.role,
  isActive: user.isActive,
});

// Leaving the password empty on edit keeps the current password.
const toPayload = ({ password, ...rest }) => (password ? { ...rest, password } : rest);

export default function UsersManager() {
  const { user: currentUser } = useAuth();
  const { items: users, loading, error, reload } = useRemoteList(usersApi.list);

  const editor = useRecordEditor({ api: usersApi, emptyForm: EMPTY_FORM, toForm, toPayload, onSaved: reload });
  const { error: actionError, run } = useActionRunner();

  const handleDelete = (user) => {
    if (!window.confirm(`Delete ${user.name}? Their reviews will be removed too.`)) return;
    run(async () => {
      await usersApi.remove(user._id);
      await reload();
    });
  };

  const { form, handleChange, isEditing } = editor;

  return (
    <>
      <PageHeader
        title="Users"
        description="Everyone who has signed up, plus the admins who manage this site."
        action={
          <button type="button" className="btn btn-primary" onClick={editor.openCreate}>
            <Plus size={16} /> Add user
          </button>
        }
      />

      {actionError && <Notice>{actionError}</Notice>}
      <ListStatus loading={loading} error={error} isEmpty={users.length === 0} emptyText="No users yet." />

      {users.length > 0 && (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Badge tone={user.role === 'admin' ? 'accent' : 'neutral'}>{user.role}</Badge>
                  </td>
                  <td>
                    <Badge tone={user.isActive ? 'success' : 'danger'}>{user.isActive ? 'Active' : 'Disabled'}</Badge>
                  </td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td className="actions">
                    <button type="button" className="icon-btn" aria-label="Edit" onClick={() => editor.openEdit(user)}>
                      <Pencil size={16} />
                    </button>
                    {user._id !== currentUser._id && (
                      <button type="button" className="icon-btn danger" aria-label="Delete" onClick={() => handleDelete(user)}>
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editor.isOpen && (
        <FormModal
          title={isEditing ? 'Edit user' : 'Add user'}
          onClose={editor.close}
          onSubmit={editor.handleSubmit}
          saving={editor.saving}
          error={editor.error}
        >
          <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
          <Field label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
          <Field
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required={!isEditing}
            minLength={6}
            hint={isEditing ? 'Leave empty to keep the current password.' : 'At least 6 characters.'}
          />
          <Field label="Role" as="select" name="role" value={form.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Field>
          <CheckboxField label="Account is active" name="isActive" checked={form.isActive} onChange={handleChange} />
        </FormModal>
      )}
    </>
  );
}
