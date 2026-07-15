import { Link } from 'react-router-dom';
import type { TopRatedMovie } from '../../utils/stats';
import { PosterImage } from '../movie/PosterImage';
import { Icon } from '../ui/Icon';
import './TopMoviesList.css';

interface TopMoviesListProps {
  movies: TopRatedMovie[];
}

export function TopMoviesList({ movies }: TopMoviesListProps) {
  return (
    <ol className="top-movies-list">
      {movies.map((movie, index) => (
        <li key={movie.movieId}>
          <Link to={`/movie/${movie.movieId}`} className="top-movies-list__item">
            <span className="top-movies-list__rank">{index + 1}</span>
            <div className="top-movies-list__poster">
              <PosterImage path={movie.posterPath} alt={movie.title} size="w185" />
            </div>
            <span className="top-movies-list__title">{movie.title}</span>
            <span className="top-movies-list__rating">
              <Icon name="star" size={14} />
              {movie.rating}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
