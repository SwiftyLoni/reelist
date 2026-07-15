import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import { useGenres } from '../queries/useGenres';
import {
  calculateAverageRating,
  calculateDecadeBreakdown,
  calculateGenreBreakdown,
  calculateTopRated,
} from '../utils/stats';
import { StatCard } from '../components/stats/StatCard';
import { GenreBreakdown } from '../components/stats/GenreBreakdown';
import { DecadeBreakdown } from '../components/stats/DecadeBreakdown';
import { TopMoviesList } from '../components/stats/TopMoviesList';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import './StatsPage.css';

export function StatsPage() {
  const watched = useUserStore((state) => state.watched);
  const ratings = useUserStore((state) => state.ratings);
  const { data: genres = [] } = useGenres();

  const averageRating = useMemo(() => calculateAverageRating(ratings), [ratings]);
  const genreStats = useMemo(
    () => calculateGenreBreakdown(watched, genres),
    [watched, genres],
  );
  const decadeStats = useMemo(() => calculateDecadeBreakdown(watched), [watched]);
  const topRated = useMemo(() => calculateTopRated(watched, ratings, 5), [watched, ratings]);

  if (watched.length === 0) {
    return (
      <EmptyState
        icon="bar-chart"
        title="No stats yet"
        description="Watch and rate some movies to see your stats."
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
        <h1 className="page-header__title">Your Stats</h1>
        <p className="page-header__subtitle">A look back at everything you've watched.</p>
      </div>

      <div className="stats-cards">
        <StatCard icon="check-circle" label="Movies Watched" value={watched.length} />
        <StatCard
          icon="star"
          label="Average Rating"
          value={averageRating > 0 ? averageRating.toFixed(1) : '—'}
        />
      </div>

      <div className="stats-grid">
        <section>
          <h2 className="section-heading">Genre Breakdown</h2>
          {genreStats.length > 0 ? (
            <GenreBreakdown stats={genreStats} />
          ) : (
            <p className="stats-empty">No genre data yet.</p>
          )}
        </section>

        <section>
          <h2 className="section-heading">Decade Breakdown</h2>
          {decadeStats.length > 0 ? (
            <DecadeBreakdown stats={decadeStats} />
          ) : (
            <p className="stats-empty">No decade data yet.</p>
          )}
        </section>
      </div>

      <section>
        <h2 className="section-heading">Your Top Rated Movies</h2>
        {topRated.length > 0 ? (
          <TopMoviesList movies={topRated} />
        ) : (
          <p className="stats-empty">Rate some movies to see your top picks.</p>
        )}
      </section>
    </>
  );
}
