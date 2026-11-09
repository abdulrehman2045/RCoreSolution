import { useState } from 'react';
import { Mail, Trash2 } from 'lucide-react';
import { messagesApi } from '../../api/index.js';
import { Badge, ListStatus, Notice, PageHeader } from '../../components/admin/AdminUI.jsx';
import { useActionRunner } from '../../hooks/useActionRunner.js';
import { useRemoteList } from '../../hooks/useRemoteList.js';
import { formatDate } from '../../lib/format.js';

const STATUS_TONES = { new: 'accent', read: 'neutral', replied: 'success' };
const STATUSES = ['new', 'read', 'replied'];

export default function MessagesManager() {
  const { items: messages, loading, error, reload } = useRemoteList(messagesApi.list);
  const { error: actionError, run } = useActionRunner();
  const [openId, setOpenId] = useState(null);

  const changeStatus = (message, status) =>
    run(async () => {
      await messagesApi.setStatus(message._id, status);
      await reload();
    });

  // Opening an unread message marks it as read.
  const toggleOpen = (message) => {
    const isOpening = openId !== message._id;
    setOpenId(isOpening ? message._id : null);
    if (isOpening && message.status === 'new') changeStatus(message, 'read');
  };

  const handleDelete = (message) => {
    if (!window.confirm(`Delete the message from ${message.name}?`)) return;
    run(async () => {
      await messagesApi.remove(message._id);
      await reload();
    });
  };

  return (
    <>
      <PageHeader title="Messages" description="Enquiries sent from the contact form." />

      {actionError && <Notice>{actionError}</Notice>}
      <ListStatus loading={loading} error={error} isEmpty={messages.length === 0} emptyText="No messages yet." />

      <div className="message-admin-list">
        {messages.map((message) => {
          const isOpen = openId === message._id;

          return (
            <article key={message._id} className={`message-item ${isOpen ? 'open' : ''}`}>
              <button type="button" className="message-summary" onClick={() => toggleOpen(message)}>
                <span>
                  <b>{message.name}</b>
                  <small className="muted"> · {message.service || 'General enquiry'}</small>
                </span>
                <span className="message-summary-right">
                  <small className="muted">{formatDate(message.createdAt)}</small>
                  <Badge tone={STATUS_TONES[message.status]}>{message.status}</Badge>
                </span>
              </button>

              {isOpen && (
                <div className="message-body">
                  <p className="message-text">{message.details}</p>

                  <dl className="message-facts">
                    <dt>Email</dt>
                    <dd>{message.email}</dd>
                    {message.phone && (
                      <>
                        <dt>Phone</dt>
                        <dd>{message.phone}</dd>
                      </>
                    )}
                    {message.business && (
                      <>
                        <dt>Business</dt>
                        <dd>{message.business}</dd>
                      </>
                    )}
                    <dt>Budget</dt>
                    <dd>{message.budget || 'Not specified'}</dd>
                  </dl>

                  <div className="message-actions">
                    <a className="btn btn-ghost" href={`mailto:${message.email}`}>
                      <Mail size={16} /> Reply by email
                    </a>
                    <select
                      aria-label="Message status"
                      value={message.status}
                      onChange={(event) => changeStatus(message, event.target.value)}
                    >
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button type="button" className="icon-btn danger" aria-label="Delete" onClick={() => handleDelete(message)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}
