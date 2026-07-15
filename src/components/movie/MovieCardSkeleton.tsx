import './MovieCardSkeleton.css';

export function MovieCardSkeleton() {
  return (
    <div className="movie-card-skeleton">
      <div className="skeleton movie-card-skeleton__poster" />
      <div className="skeleton movie-card-skeleton__title" />
      <div className="skeleton movie-card-skeleton__year" />
    </div>
  );
}
