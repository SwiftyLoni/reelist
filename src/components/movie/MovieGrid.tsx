import type { Movie } from '../../types/tmdb';
import { MovieCard } from './MovieCard';
import { MovieCardSkeleton } from './MovieCardSkeleton';
import './MovieGrid.css';

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
  skeletonCount?: number;
}

export function MovieGrid({ movies, isLoading = false, skeletonCount = 12 }: MovieGridProps) {
  if (isLoading && movies.length === 0) {
    return (
      <div className="movie-grid" role="list">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="movie-grid" role="list">
      {movies.map((movie) => (
        <div role="listitem" key={movie.id}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}
