import { Eye, EyeOff, Trash2 } from 'lucide-react';
import { reviewsApi } from '../../api/index.js';
import { Badge, ListStatus, Notice, PageHeader } from '../../components/admin/AdminUI.jsx';
import StarRating from '../../components/StarRating.jsx';
import { useActionRunner } from '../../hooks/useActionRunner.js';
import { useRemoteList } from '../../hooks/useRemoteList.js';
import { formatDate } from '../../lib/format.js';

export default function ReviewsManager() {
  const { items: reviews, loading, error, reload } = useRemoteList(reviewsApi.listAll);
  const { error: actionError, run } = useActionRunner();

  const toggleApproval = (review) =>
    run(async () => {
      await reviewsApi.setApproval(review._id, !review.isApproved);
      await reload();
    });

  const handleDelete = (review) => {
    if (!window.confirm('Delete this review permanently?')) return;
    run(async () => {
      await reviewsApi.remove(review._id);
      await reload();
    });
  };

  return (
    <>
      <PageHeader
        title="Reviews"
        description="Hide a review to remove it from the website without deleting it."
      />

      {actionError && <Notice>{actionError}</Notice>}
      <ListStatus loading={loading} error={error} isEmpty={reviews.length === 0} emptyText="No reviews yet." />

      {reviews.length > 0 && (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Author</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Status</th>
                <th>Date</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td>
                    {review.user?.name}
                    <small className="block muted">{review.user?.email}</small>
                  </td>
                  <td>
                    <StarRating value={review.rating} />
                  </td>
                  <td className="wide-cell">{review.comment}</td>
                  <td>
                    <Badge tone={review.isApproved ? 'success' : 'danger'}>
                      {review.isApproved ? 'Visible' : 'Hidden'}
                    </Badge>
                  </td>
                  <td>{formatDate(review.createdAt)}</td>
                  <td className="actions">
                    <button
                      type="button"
                      className="icon-btn"
                      aria-label={review.isApproved ? 'Hide review' : 'Show review'}
                      onClick={() => toggleApproval(review)}
                    >
                      {review.isApproved ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button type="button" className="icon-btn danger" aria-label="Delete" onClick={() => handleDelete(review)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
