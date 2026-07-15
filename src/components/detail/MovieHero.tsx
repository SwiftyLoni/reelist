import type { ReactNode } from 'react';
import type { MovieDetails } from '../../types/tmdb';
import { backdropUrl } from '../../utils/images';
import { formatRuntime, formatYear } from '../../utils/formatters';
import { PosterImage } from '../movie/PosterImage';
import { RatingBadge } from '../movie/RatingBadge';
import { GenreChip } from '../movie/GenreChip';
import './MovieHero.css';

interface MovieHeroProps {
  movie: MovieDetails;
  children?: ReactNode;
}

export function MovieHero({ movie, children }: MovieHeroProps) {
  const backdrop = backdropUrl(movie.backdrop_path, 'w1280');

  return (
    <section className="movie-hero">
      {backdrop && (
        <img src={backdrop} alt="" className="movie-hero__backdrop" aria-hidden="true" />
      )}
      <div className="movie-hero__overlay" />
      <div className="movie-hero__content">
        <div className="movie-hero__poster">
          <PosterImage path={movie.poster_path} alt={movie.title} size="w500" loading="eager" />
        </div>
        <div className="movie-hero__info">
          <h1 className="movie-hero__title">{movie.title}</h1>
          {movie.tagline && <p className="movie-hero__tagline">{movie.tagline}</p>}
          <div className="movie-hero__meta">
            <RatingBadge rating={movie.vote_average} />
            <span>{formatYear(movie.release_date)}</span>
            <span>{formatRuntime(movie.runtime)}</span>
          </div>
          <div className="movie-hero__genres">
            {movie.genres.map((genre) => (
              <GenreChip key={genre.id} label={genre.name} />
            ))}
          </div>
          <p className="movie-hero__overview">{movie.overview}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
