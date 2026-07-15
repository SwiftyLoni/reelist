import { useParams } from 'react-router-dom';
import { useMovieDetail } from '../queries/useMovieDetail';
import { MovieHero } from '../components/detail/MovieHero';
import { UserActions } from '../components/detail/UserActions';
import { TrailerButton } from '../components/detail/TrailerButton';
import { CastSection } from '../components/detail/CastSection';
import { SimilarMovies } from '../components/detail/SimilarMovies';
import { EmptyState } from '../components/ui/EmptyState';
import './MovieDetailPage.css';

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);
  const { movie, cast, similar, trailer, isLoading, isError } = useMovieDetail(movieId);

  if (isLoading) {
    return (
      <div className="movie-detail-skeleton">
        <div className="skeleton movie-detail-skeleton__hero" />
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <EmptyState
        icon="alert-triangle"
        title="Couldn't load this movie"
        description="Something went wrong fetching the movie details. Please try again."
      />
    );
  }

  return (
    <>
      <MovieHero movie={movie}>
        <UserActions movie={movie} />
        <TrailerButton trailer={trailer} />
      </MovieHero>
      <CastSection cast={cast} />
      <SimilarMovies movies={similar} />
    </>
  );
}
