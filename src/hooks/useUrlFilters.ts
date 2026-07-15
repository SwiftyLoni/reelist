import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { DiscoverFilters, SortDirection, SortOption } from '../types/tmdb';

const CURRENT_YEAR = new Date().getFullYear();

export const DEFAULT_FILTERS: DiscoverFilters = {
  genres: [],
  yearFrom: 1970,
  yearTo: CURRENT_YEAR,
  minRating: 0,
  sortBy: 'popularity',
  sortDirection: 'desc',
};

const VALID_SORT_BY: SortOption[] = ['popularity', 'vote_average', 'release_date', 'title'];

function parseFilters(params: URLSearchParams): DiscoverFilters {
  const genresParam = params.get('genres');
  const sortByParam = params.get('sortBy');

  return {
    genres: genresParam
      ? genresParam.split(',').map(Number).filter(Number.isFinite)
      : DEFAULT_FILTERS.genres,
    yearFrom: Number(params.get('yearFrom')) || DEFAULT_FILTERS.yearFrom,
    yearTo: Number(params.get('yearTo')) || DEFAULT_FILTERS.yearTo,
    minRating: Number(params.get('minRating')) || DEFAULT_FILTERS.minRating,
    sortBy: (VALID_SORT_BY.includes(sortByParam as SortOption)
      ? sortByParam
      : DEFAULT_FILTERS.sortBy) as SortOption,
    sortDirection: (params.get('sortDirection') === 'asc' ? 'asc' : 'desc') as SortDirection,
  };
}

export function useUrlFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => parseFilters(searchParams), [searchParams]);

  const setFilters = useCallback(
    (next: Partial<DiscoverFilters>) => {
      const merged = { ...filters, ...next };
      const params = new URLSearchParams();

      if (merged.genres.length) params.set('genres', merged.genres.join(','));
      if (merged.yearFrom !== DEFAULT_FILTERS.yearFrom)
        params.set('yearFrom', String(merged.yearFrom));
      if (merged.yearTo !== DEFAULT_FILTERS.yearTo) params.set('yearTo', String(merged.yearTo));
      if (merged.minRating !== DEFAULT_FILTERS.minRating)
        params.set('minRating', String(merged.minRating));
      if (merged.sortBy !== DEFAULT_FILTERS.sortBy) params.set('sortBy', merged.sortBy);
      if (merged.sortDirection !== DEFAULT_FILTERS.sortDirection)
        params.set('sortDirection', merged.sortDirection);

      setSearchParams(params, { replace: true });
    },
    [filters, setSearchParams],
  );

  const resetFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  const isActive = useMemo(
    () =>
      filters.genres.length > 0 ||
      filters.yearFrom !== DEFAULT_FILTERS.yearFrom ||
      filters.yearTo !== DEFAULT_FILTERS.yearTo ||
      filters.minRating !== DEFAULT_FILTERS.minRating ||
      filters.sortBy !== DEFAULT_FILTERS.sortBy ||
      filters.sortDirection !== DEFAULT_FILTERS.sortDirection,
    [filters],
  );

  return { filters, setFilters, resetFilters, isActive };
}
