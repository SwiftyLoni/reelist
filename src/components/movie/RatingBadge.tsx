import { Icon } from '../ui/Icon';
import { formatRating } from '../../utils/formatters';
import './RatingBadge.css';

interface RatingBadgeProps {
  rating: number;
}

export function RatingBadge({ rating }: RatingBadgeProps) {
  return (
    <span className="rating-badge">
      <Icon name="star" size={12} />
      {formatRating(rating)}
    </span>
  );
}
