import { Star } from 'lucide-react';

const STARS = [1, 2, 3, 4, 5];

/** Shows a 1-5 star rating. Pass `onChange` to make it clickable. */
export default function StarRating({ value, onChange }) {
  return (
    <div className="stars" role="img" aria-label={`${value} out of 5 stars`}>
      {STARS.map((number) => {
        const star = <Star size={18} fill={number <= value ? 'currentColor' : 'none'} />;

        if (!onChange) return <span key={number}>{star}</span>;

        return (
          <button type="button" key={number} aria-label={`${number} stars`} onClick={() => onChange(number)}>
            {star}
          </button>
        );
      })}
    </div>
  );
}
