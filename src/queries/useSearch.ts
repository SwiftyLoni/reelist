import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { searchMovies } from '../api/search';
import { queryKeys } from './keys';
import { useDebounce } from '../hooks/useDebounce';

export function useSearchResults(query: string) {
  return useInfiniteQuery({
    queryKey: queryKeys.search(query),
    queryFn: ({ pageParam }) => searchMovies(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    enabled: query.trim().length > 0,
  });
}

// TMDB allows ~40 requests per 10s; the 300ms debounce combined with
// TanStack Query's cache/de-dupe keeps suggestion typing well under that.
export function useSearchSuggestions(rawQuery: string) {
  const query = useDebounce(rawQuery, 300);

  return useQuery({
    queryKey: queryKeys.search(`suggest:${query}`),
    queryFn: () => searchMovies(query),
    enabled: query.trim().length > 0,
    select: (data) => data.results.slice(0, 5),
  });
}
