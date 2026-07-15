import { useCallback, useMemo } from 'react';
import { useDiscover } from '../queries/useDiscover';
import { useGenres } from '../queries/useGenres';
import { useUrlFilters } from '../hooks/useUrlFilters';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { FilterPanel } from '../components/discover/FilterPanel';
import { GenreSelector } from '../components/discover/GenreSelector';
import { YearRangeSlider } from '../components/discover/YearRangeSlider';
import { RatingSelector } from '../components/discover/RatingSelector';
import { SortDropdown } from '../components/discover/SortDropdown';
import { MovieGrid } from '../components/movie/MovieGrid';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';

const CURRENT_YEAR = new Date().getFullYear();

export function DiscoverPage() {
  const { filters, setFilters, resetFilters, isActive } = useUrlFilters();
  const { data: genres = [] } = useGenres();

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useDiscover(filters);

  const movies = useMemo(() => data?.pages.flatMap((page) => page.results) ?? [], [data]);

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const sentinelRef = useIntersectionObserver({ onIntersect: handleIntersect });

  return (
    <>
      <div className="page-header">
        <h1 className="page-header__title">Discover</h1>
        <p className="page-header__subtitle">Filter and browse the full movie catalog.</p>
      </div>

      <FilterPanel>
        <FilterPanel.Section title="Genres">
          <GenreSelector
            genres={genres}
            selected={filters.genres}
            onChange={(next) => setFilters({ genres: next })}
          />
        </FilterPanel.Section>

        <FilterPanel.Section title="Year">
          <YearRangeSlider
            min={1970}
            max={CURRENT_YEAR}
            from={filters.yearFrom}
            to={filters.yearTo}
            onChange={(yearFrom, yearTo) => setFilters({ yearFrom, yearTo })}
          />
        </FilterPanel.Section>

        <FilterPanel.Section title="Minimum Rating">
          <RatingSelector
            value={filters.minRating}
            onChange={(minRating) => setFilters({ minRating })}
          />
        </FilterPanel.Section>

        <FilterPanel.Section title="Sort">
          <SortDropdown
            sortBy={filters.sortBy}
            sortDirection={filters.sortDirection}
            onSortByChange={(sortBy) => setFilters({ sortBy })}
            onDirectionToggle={() =>
              setFilters({ sortDirection: filters.sortDirection === 'asc' ? 'desc' : 'asc' })
            }
          />
        </FilterPanel.Section>

        {isActive && (
          <Button
            variant="ghost"
            size="sm"
            icon={<Icon name="close" size={14} />}
            onClick={resetFilters}
          >
            Reset filters
          </Button>
        )}
      </FilterPanel>

      <div style={{ marginTop: '2rem' }}>
        {!isLoading && movies.length === 0 ? (
          <EmptyState
            icon="compass"
            title="No movies match these filters"
            description="Try widening the year range or clearing a few filters."
            action={
              <Button variant="secondary" onClick={resetFilters}>
                Reset filters
              </Button>
            }
          />
        ) : (
          <MovieGrid movies={movies} isLoading={isLoading} />
        )}
      </div>

      <div ref={sentinelRef} className="infinite-sentinel" />
      {isFetchingNextPage && <div className="load-more-indicator">Loading more…</div>}
    </>
  );
}
