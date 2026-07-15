import type { MovieDetails } from '../../types/tmdb';
import { useUserStore } from '../../store/useUserStore';
import { useToast } from '../../hooks/useToast';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { StarRating } from './StarRating';
import './UserActions.css';

interface UserActionsProps {
  movie: MovieDetails;
}

export function UserActions({ movie }: UserActionsProps) {
  const { show } = useToast();

  const isInWatchlist = useUserStore((state) => state.isInWatchlist(movie.id));
  const isWatched = useUserStore((state) => state.isWatched(movie.id));
  const rating = useUserStore((state) => state.getRating(movie.id)) ?? 0;

  const addToWatchlist = useUserStore((state) => state.addToWatchlist);
  const removeFromWatchlist = useUserStore((state) => state.removeFromWatchlist);
  const markWatched = useUserStore((state) => state.markWatched);
  const removeFromWatched = useUserStore((state) => state.removeFromWatched);
  const setRating = useUserStore((state) => state.setRating);

  const toggleWatchlist = () => {
    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
      show('Removed from watchlist', 'info');
    } else {
      addToWatchlist({
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
      });
      show('Added to watchlist', 'success');
    }
  };

  const toggleWatched = () => {
    if (isWatched) {
      removeFromWatched(movie.id);
      show('Removed from watched', 'info');
    } else {
      markWatched({
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        genreIds: movie.genres.map((g) => g.id),
      });
      show('Marked as watched', 'success');
    }
  };

  return (
    <div className="user-actions">
      <div className="user-actions__buttons">
        <Button
          variant={isInWatchlist ? 'primary' : 'secondary'}
          icon={<Icon name={isInWatchlist ? 'bookmark-filled' : 'bookmark'} size={16} />}
          onClick={toggleWatchlist}
        >
          {isInWatchlist ? 'On Watchlist' : 'Add to Watchlist'}
        </Button>
        <Button
          variant={isWatched ? 'primary' : 'secondary'}
          icon={<Icon name="check-circle" size={16} />}
          onClick={toggleWatched}
        >
          {isWatched ? 'Watched' : 'Mark Watched'}
        </Button>
      </div>
      <div className="user-actions__rating">
        <span className="user-actions__rating-label">Your rating</span>
        <StarRating
          value={rating}
          onChange={(next) => {
            setRating(movie.id, next);
            show('Rating saved', 'success');
          }}
        />
      </div>
    </div>
  );
}
