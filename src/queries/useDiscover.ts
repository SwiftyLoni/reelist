import { useInfiniteQuery } from '@tanstack/react-query';
import { discoverMovies } from '../api/movies';
import type { DiscoverFilters } from '../types/tmdb';
import { queryKeys } from './keys';

export function useDiscover(filters: DiscoverFilters) {
  return useInfiniteQuery({
    queryKey: queryKeys.discover(filters),
    queryFn: ({ pageParam }) => discoverMovies(filters, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });
}
