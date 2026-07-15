import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import { useToast } from '../hooks/useToast';
import type { SortByAdded } from '../types/user';
import { PosterImage } from '../components/movie/PosterImage';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import './SavedListPage.css';

const SORT_OPTIONS: { value: SortByAdded; label: string }[] = [
  { value: 'recent', label: 'Recently Added' },
  { value: 'alphabetical', label: 'Alphabetical' },
  { value: 'rating', label: 'Your Rating' },
];

export function WatchedPage() {
  const watched = useUserStore((state) => state.watched);
  const ratings = useUserStore((state) => state.ratings);
  const removeFromWatched = useUserStore((state) => state.removeFromWatched);
  const { show } = useToast();
  const [sortBy, setSortBy] = useState<SortByAdded>('recent');

  const ratingByMovieId = useMemo(
    () => new Map(ratings.map((r) => [r.movieId, r.rating])),
    [ratings],
  );

  const sorted = useMemo(() => {
    const items = [...watched];
    if (sortBy === 'alphabetical') {
      items.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'rating') {
      items.sort(
        (a, b) => (ratingByMovieId.get(b.movieId) ?? 0) - (ratingByMovieId.get(a.movieId) ?? 0),
      );
    } else {
      items.sort((a, b) => b.watchedAt - a.watchedAt);
    }
    return items;
  }, [watched, sortBy, ratingByMovieId]);

  if (watched.length === 0) {
    return (
      <EmptyState
        icon="check-circle"
        title="You haven't watched anything yet"
        description="Mark movies as watched from their detail page to track them here."
        action={
          <Link to="/">
            <Button>Browse Trending</Button>
          </Link>
        }
      />
    );
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-header__title">Watched</h1>
        <p className="page-header__subtitle">{watched.length} movies watched</p>
      </div>

      <div className="saved-list-sort">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`saved-list-sort__btn${sortBy === option.value ? ' saved-list-sort__btn--active' : ''}`}
            onClick={() => setSortBy(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="saved-list-grid">
        {sorted.map((item) => {
          const rating = ratingByMovieId.get(item.movieId);
          return (
            <div className="saved-list-card" key={item.movieId}>
              <Link to={`/movie/${item.movieId}`}>
                <PosterImage path={item.posterPath} alt={item.title} />
              </Link>
              <p className="saved-list-card__title">{item.title}</p>
              {rating !== undefined && (
                <span className="saved-list-card__rating">
                  <Icon name="star" size={13} />
                  {rating}/10
                </span>
              )}
              <button
                type="button"
                className="saved-list-card__remove"
                onClick={() => {
                  removeFromWatched(item.movieId);
                  show('Removed from watched', 'info');
                }}
                aria-label={`Remove ${item.title} from watched`}
              >
                <Icon name="trash" size={14} />
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
