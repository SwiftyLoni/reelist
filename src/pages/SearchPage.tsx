import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchResults } from '../queries/useSearch';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { MovieGrid } from '../components/movie/MovieGrid';
import { EmptyState } from '../components/ui/EmptyState';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.trim() ?? '';

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useSearchResults(query);

  const movies = useMemo(() => data?.pages.flatMap((page) => page.results) ?? [], [data]);

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const sentinelRef = useIntersectionObserver({ onIntersect: handleIntersect, enabled: !!query });

  if (!query) {
    return (
      <EmptyState
        icon="search"
        title="Search for a movie"
        description="Use the search bar above to find movies by title."
      />
    );
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-header__title">Results for “{query}”</h1>
        <p className="page-header__subtitle">
          {isLoading ? 'Searching…' : `${data?.pages[0]?.total_results ?? 0} movies found`}
        </p>
      </div>

      {!isLoading && movies.length === 0 ? (
        <EmptyState
          icon="search"
          title="No movies found"
          description={`We couldn't find any results for "${query}". Try a different title.`}
        />
      ) : (
        <MovieGrid movies={movies} isLoading={isLoading} />
      )}

      <div ref={sentinelRef} className="infinite-sentinel" />
      {isFetchingNextPage && <div className="load-more-indicator">Loading more…</div>}
    </>
  );
}
