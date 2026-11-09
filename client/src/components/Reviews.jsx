import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { reviewsApi } from '../api/index.js';
import { useAuth } from '../context/AuthContext.jsx';
import StarRating from './StarRating.jsx';
import { Head } from './UI.jsx';

/** Client reviews, plus a form for logged-in users to add their own. */
export default function Reviews() {
  const { user, isAdmin } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    reviewsApi
      .list()
      .then((data) => setReviews(data.items))
      .catch((loadError) => setError(loadError.message));
  }, []);

  const ownReview = user && reviews.find((review) => review.user?._id === user._id);
  const canDelete = (review) => isAdmin || review.user?._id === user?._id;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const { item } = await reviewsApi.create({ rating, comment });
      setReviews([item, ...reviews]);
      setComment('');
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    setError('');

    try {
      await reviewsApi.remove(reviewId);
      setReviews(reviews.filter((review) => review._id !== reviewId));
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  return (
    <section className="section">
      <div className="wrap">
        <Head title="What Our Clients Say" text="Honest feedback from people who have worked with us." />

        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to share your experience.</p>
        ) : (
          <div className="grid3">
            {reviews.map((review) => (
              <article key={review._id} className="card review">
                <StarRating value={review.rating} />
                <p>{review.comment}</p>
                <footer>
                  <b>{review.user?.name || 'Client'}</b>
                  {canDelete(review) && (
                    <button type="button" aria-label="Delete review" onClick={() => handleDelete(review._id)}>
                      <Trash2 size={16} />
                    </button>
                  )}
                </footer>
              </article>
            ))}
          </div>
        )}

        <div className="review-form">
          {error && <p className="form-error">{error}</p>}

          {!user && (
            <p>
              <Link className="more" to="/login" state={{ from: '/' }}>
                Log in
              </Link>{' '}
              or <Link to="/register">create an account</Link> to write a review.
            </p>
          )}

          {user && ownReview && <p>Thank you for sharing your review.</p>}

          {user && !ownReview && (
            <form onSubmit={handleSubmit}>
              <h3>Write a review</h3>
              <StarRating value={rating} onChange={setRating} />
              <label>
                Your experience
                <textarea
                  rows="4"
                  value={comment}
                  maxLength={600}
                  required
                  onChange={(event) => setComment(event.target.value)}
                />
              </label>
              <button className="btn btn-primary" type="submit" disabled={submitting}>
                {submitting ? 'Posting…' : 'Post review'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
