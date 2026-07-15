import { HeroSection } from '../components/movie/HeroSection';
import { MovieRow } from '../components/movie/MovieRow';
import { useNowPlaying, useTopRated, useTrending, useUpcoming } from '../queries/useMovies';

export function HomePage() {
  const trending = useTrending();
  const topRated = useTopRated();
  const nowPlaying = useNowPlaying();
  const upcoming = useUpcoming();

  const heroMovie = trending.data?.[0];

  return (
    <>
      {heroMovie && <HeroSection movie={heroMovie} />}
      <MovieRow
        title="Trending Today"
        movies={trending.data ?? []}
        isLoading={trending.isLoading}
      />
      <MovieRow title="Top Rated" movies={topRated.data ?? []} isLoading={topRated.isLoading} />
      <MovieRow
        title="Now Playing"
        movies={nowPlaying.data ?? []}
        isLoading={nowPlaying.isLoading}
      />
      <MovieRow title="Upcoming" movies={upcoming.data ?? []} isLoading={upcoming.isLoading} />
    </>
  );
}
