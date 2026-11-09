import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productsApi, servicesApi } from '../../api/index.js';
import {
  Field,
  FormModal,
  ListStatus,
  Notice,
  PageHeader,
} from '../../components/admin/AdminUI.jsx';
import { useSite } from '../../context/SiteContext.jsx';
import { useActionRunner } from '../../hooks/useActionRunner.js';
import { useRecordEditor } from '../../hooks/useRecordEditor.js';
import { getIcon, ICON_NAMES } from '../../lib/icons.js';
import { splitLines } from '../../lib/format.js';

const KIND_CONFIG = {
  services: { label: 'Service', title: 'Services', api: servicesApi },
  products: { label: 'Product', title: 'Products', api: productsApi },
};

const EMPTY_FORM = {
  name: '',
  slug: '',
  description: '',
  icon: 'Code2',
  problem: '',
  solution: '',
  features: '',
  faqQuestion: '',
  faqAnswer: '',
  order: 0,
};

const toForm = (item) => ({
  name: item.name,
  slug: item.slug,
  description: item.description,
  icon: item.icon,
  problem: item.problem,
  solution: item.solution,
  features: item.features.join('\n'),
  faqQuestion: item.faqQuestion,
  faqAnswer: item.faqAnswer,
  order: item.order,
});

const toPayload = (form) => ({
  ...form,
  features: splitLines(form.features),
  order: Number(form.order) || 0,
});

/** Create, edit and delete services or products. */
export default function CatalogManager({ kind }) {
  const { label, title, api } = KIND_CONFIG[kind];
  const site = useSite();
  const items = site[kind];

  const editor = useRecordEditor({
    api,
    emptyForm: EMPTY_FORM,
    toForm,
    toPayload,
    onSaved: site.reload,
  });
  const { error: actionError, run } = useActionRunner();

  const handleDelete = (item) => {
    if (!window.confirm(`Delete "${item.name}"? This cannot be undone.`)) return;
    run(async () => {
      await api.remove(item._id);
      await site.reload();
    });
  };

  const { form, handleChange } = editor;

  return (
    <>
      <PageHeader
        title={title}
        description={`These ${title.toLowerCase()} appear on the public website.`}
        action={
          <button type="button" className="btn btn-primary" onClick={editor.openCreate}>
            <Plus size={16} /> Add {label.toLowerCase()}
          </button>
        }
      />

      {actionError && <Notice>{actionError}</Notice>}
      <ListStatus loading={!site.ready} isEmpty={items.length === 0} emptyText={`No ${title.toLowerCase()} yet.`} />

      {items.length > 0 && (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Name</th>
                <th>Page</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const Icon = getIcon(item.icon);

                return (
                  <tr key={item._id}>
                    <td>{item.order}</td>
                    <td>
                      <span className="cell-with-icon">
                        <Icon size={18} />
                        {item.name}
                      </span>
                    </td>
                    <td>
                      <Link to={item.to}>{item.to}</Link>
                    </td>
                    <td className="actions">
                      <button type="button" className="icon-btn" aria-label="Edit" onClick={() => editor.openEdit(item)}>
                        <Pencil size={16} />
                      </button>
                      <button type="button" className="icon-btn danger" aria-label="Delete" onClick={() => handleDelete(item)}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {editor.isOpen && (
        <FormModal
          title={`${editor.isEditing ? 'Edit' : 'Add'} ${label.toLowerCase()}`}
          onClose={editor.close}
          onSubmit={editor.handleSubmit}
          saving={editor.saving}
          error={editor.error}
        >
          <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
          <Field
            label="Page address (slug)"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            hint="Optional. Created from the name if left empty, e.g. my-service."
          />
          <Field
            label="Short description"
            as="textarea"
            rows="2"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <div className="two">
            <Field label="Icon" as="select" name="icon" value={form.icon} onChange={handleChange}>
              {ICON_NAMES.map((iconName) => (
                <option key={iconName}>{iconName}</option>
              ))}
            </Field>
            <Field
              label="Display order"
              type="number"
              name="order"
              value={form.order}
              onChange={handleChange}
              hint="Smaller numbers come first."
            />
          </div>
          <Field label="The problem" as="textarea" rows="3" name="problem" value={form.problem} onChange={handleChange} required />
          <Field label="Our solution" as="textarea" rows="3" name="solution" value={form.solution} onChange={handleChange} required />
          <Field
            label="Features"
            as="textarea"
            rows="5"
            name="features"
            value={form.features}
            onChange={handleChange}
            hint="One feature per line."
          />
          <Field label="FAQ question" name="faqQuestion" value={form.faqQuestion} onChange={handleChange} />
          <Field label="FAQ answer" as="textarea" rows="2" name="faqAnswer" value={form.faqAnswer} onChange={handleChange} />
        </FormModal>
      )}
    </>
  );
}
