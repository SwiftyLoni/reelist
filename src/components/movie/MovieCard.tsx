import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '../../types/tmdb';
import { PosterImage } from './PosterImage';
import { RatingBadge } from './RatingBadge';
import { formatYear } from '../../utils/formatters';
import { usePrefetchMovieDetail } from '../../queries/useMovieDetail';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
}

function MovieCardImpl({ movie }: MovieCardProps) {
  const prefetch = usePrefetchMovieDetail();

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="movie-card"
      onMouseEnter={() => prefetch(movie.id)}
      onFocus={() => prefetch(movie.id)}
    >
      <div className="movie-card__poster-wrap">
        <PosterImage path={movie.poster_path} alt={movie.title} />
        {movie.vote_average > 0 && (
          <div className="movie-card__rating">
            <RatingBadge rating={movie.vote_average} />
          </div>
        )}
      </div>
      <div className="movie-card__meta">
        <h3 className="movie-card__title">{movie.title}</h3>
        <span className="movie-card__year">{formatYear(movie.release_date)}</span>
      </div>
    </Link>
  );
}

export const MovieCard = memo(MovieCardImpl);
