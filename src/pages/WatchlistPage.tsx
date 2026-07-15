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

export function WatchlistPage() {
  const watchlist = useUserStore((state) => state.watchlist);
  const ratings = useUserStore((state) => state.ratings);
  const removeFromWatchlist = useUserStore((state) => state.removeFromWatchlist);
  const { show } = useToast();
  const [sortBy, setSortBy] = useState<SortByAdded>('recent');

  const ratingByMovieId = useMemo(
    () => new Map(ratings.map((r) => [r.movieId, r.rating])),
    [ratings],
  );

  const sorted = useMemo(() => {
    const items = [...watchlist];
    if (sortBy === 'alphabetical') {
      items.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'rating') {
      items.sort(
        (a, b) => (ratingByMovieId.get(b.movieId) ?? 0) - (ratingByMovieId.get(a.movieId) ?? 0),
      );
    } else {
      items.sort((a, b) => b.addedAt - a.addedAt);
    }
    return items;
  }, [watchlist, sortBy, ratingByMovieId]);

  if (watchlist.length === 0) {
    return (
      <EmptyState
        icon="bookmark"
        title="Your watchlist is empty"
        description="Save movies you want to watch later and they'll show up here."
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
        <h1 className="page-header__title">Watchlist</h1>
        <p className="page-header__subtitle">{watchlist.length} movies saved</p>
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
        {sorted.map((item) => (
          <div className="saved-list-card" key={item.movieId}>
            <Link to={`/movie/${item.movieId}`}>
              <PosterImage path={item.posterPath} alt={item.title} />
            </Link>
            <p className="saved-list-card__title">{item.title}</p>
            <button
              type="button"
              className="saved-list-card__remove"
              onClick={() => {
                removeFromWatchlist(item.movieId);
                show('Removed from watchlist', 'info');
              }}
              aria-label={`Remove ${item.title} from watchlist`}
            >
              <Icon name="trash" size={14} />
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
