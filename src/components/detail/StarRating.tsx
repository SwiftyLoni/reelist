import { useState } from 'react';
import { Icon } from '../ui/Icon';
import './StarRating.css';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

export function StarRating({ value, onChange }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const display = hovered ?? value;

  return (
    <div className="star-rating" role="radiogroup" aria-label="Rate this movie out of 10">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type="button"
          className="star-rating__star"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onChange(star)}
        >
          <Icon name={star <= display ? 'star' : 'star-outline'} size={22} />
        </button>
      ))}
      {value > 0 && <span className="star-rating__value">{value}/10</span>}
    </div>
  );
}
