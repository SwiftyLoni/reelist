import type { Movie } from '../../types/tmdb';
import { MovieGrid } from '../movie/MovieGrid';
import './SimilarMovies.css';

interface SimilarMoviesProps {
  movies: Movie[];
}

export function SimilarMovies({ movies }: SimilarMoviesProps) {
  if (movies.length === 0) return null;

  return (
    <section className="similar-movies" aria-label="Similar movies">
      <h2 className="similar-movies__title">Similar Movies</h2>
      <MovieGrid movies={movies} />
    </section>
  );
}
